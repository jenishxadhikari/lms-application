import * as React from "react"

import {
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type OnChangeFn,
  type PaginationState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table"
import { SearchIcon, SearchXIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { features } from "@/components/table/data-table-features"
import { DataTableFilter } from "@/components/table/data-table-filter"
import { DataTablePagination } from "@/components/table/data-table-pagination"
import { DataTableViewOptions } from "@/components/table/data-table-view-options"

type FilterOption = { label: string; value: string | boolean }

export interface DataTableFilterConfig {
  columnId: string
  label: string
  allLabel: string
  options: readonly FilterOption[]
}

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<typeof features, TData>[]
  data: TData[]
  caption: string
  itemLabel: { singular: string; plural: string }
  search?: { columnId: string; label: string; placeholder: string }
  filters?: readonly DataTableFilterConfig[]
  emptyState: {
    title: string
    description: string
    filteredTitle: string
    filteredDescription: string
  }
  initialColumnVisibility?: ColumnVisibilityState
  tableClassName?: string
  pagination?: {
    state: PaginationState
    onChange: OnChangeFn<PaginationState>
    rowCount: number
  }
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  caption,
  itemLabel,
  search,
  filters = [],
  emptyState,
  initialColumnVisibility = {},
  tableClassName,
  pagination,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>(initialColumnVisibility)
  const [localPagination, setLocalPagination] = React.useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize: 10,
    }
  )

  const table = useTable({
    features,
    data,
    columns,
    manualPagination: !!pagination,
    rowCount: pagination?.rowCount,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: pagination?.onChange ?? setLocalPagination,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: pagination?.state ?? localPagination,
    },
  })

  const searchColumn = search ? table.getColumn(search.columnId) : undefined
  const searchValue = (searchColumn?.getFilterValue() as string) ?? ""
  const rows = table.getRowModel().rows
  const hasFilters = columnFilters.length > 0

  const resetFilters = () => table.resetColumnFilters(true)

  return (
    <div className="min-w-0">
      <div className="flex flex-col gap-3 border-b bg-muted/10 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {search && (
            <div className="relative w-full sm:max-w-sm">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label={search.label}
                placeholder={search.placeholder}
                value={searchValue}
                onChange={(event) =>
                  searchColumn?.setFilterValue(event.target.value)
                }
                className="h-9 pr-9 pl-9"
              />
              {searchValue && (
                <Button
                  aria-label={`Clear ${search.label.toLowerCase()}`}
                  variant="ghost"
                  size="icon-sm"
                  className="absolute top-1/2 right-0.5 -translate-y-1/2 text-muted-foreground"
                  onClick={() => searchColumn?.setFilterValue(undefined)}
                >
                  <XIcon />
                </Button>
              )}
            </div>
          )}

          {filters.length > 0 && (
            <div className="grid grid-cols-2 gap-2 sm:flex">
              {filters.map((filter) => (
                <DataTableFilter
                  key={filter.columnId}
                  label={filter.label}
                  allLabel={filter.allLabel}
                  column={table.getColumn(filter.columnId)}
                  options={filter.options}
                />
              ))}
            </div>
          )}

          {hasFilters && (
            <Button
              variant="outline"
              size="sm"
              className="h-9 justify-start text-muted-foreground sm:justify-center"
              onClick={resetFilters}
            >
              Reset filters
              <XIcon />
            </Button>
          )}
        </div>

        <DataTableViewOptions table={table} />
      </div>

      <div className="overflow-hidden">
        <Table className={tableClassName}>
          <TableCaption className="sr-only">{caption}</TableCaption>
          <TableHeader className="bg-muted/35">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const sortDirection = header.column.getIsSorted()

                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      aria-sort={
                        sortDirection === "asc"
                          ? "ascending"
                          : sortDirection === "desc"
                            ? "descending"
                            : undefined
                      }
                      className={
                        header.column.id === "actions"
                          ? "h-11 w-14 px-4"
                          : "h-11 px-4 text-xs text-muted-foreground"
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "actions"
                          ? "w-14 px-4 py-3"
                          : "px-4 py-3"
                      }
                    >
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length}
                  className="h-64 px-4 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <SearchXIcon className="size-5" />
                    </div>
                    <p className="font-medium text-foreground">
                      {data.length === 0
                        ? emptyState.title
                        : emptyState.filteredTitle}
                    </p>
                    <p className="mt-1 text-sm whitespace-normal text-muted-foreground">
                      {data.length === 0
                        ? emptyState.description
                        : emptyState.filteredDescription}
                    </p>
                    {hasFilters && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={resetFilters}
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} itemLabel={itemLabel} />
    </div>
  )
}
