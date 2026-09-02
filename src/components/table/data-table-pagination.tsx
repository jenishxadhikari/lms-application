import { type ReactTable, type RowData } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import type { DataTableFeatures } from "@/components/table/data-table-features"

interface DataTablePaginationProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>
  itemLabel?: {
    singular: string
    plural: string
  }
}

export function DataTablePagination<TData extends RowData>({
  table,
  itemLabel = { singular: "row", plural: "rows" },
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.state.pagination
  const visibleRowCount = table.getRowModel().rows.length
  const filteredRowCount = table.getFilteredRowModel().rows.length
  const firstVisibleRow = visibleRowCount ? pageIndex * pageSize + 1 : 0
  const lastVisibleRow = visibleRowCount
    ? Math.min(firstVisibleRow + visibleRowCount - 1, filteredRowCount)
    : 0
  const displayedItemLabel =
    filteredRowCount === 1 ? itemLabel.singular : itemLabel.plural

  return (
    <div className="flex flex-col gap-3 border-t bg-muted/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex-1 text-sm text-muted-foreground" aria-live="polite">
        Showing {firstVisibleRow}–{lastVisibleRow} of{" "}
        {table.getFilteredRowModel().rows.length} {displayedItemLabel}
      </p>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-25 items-center justify-center text-sm font-medium">
          Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
