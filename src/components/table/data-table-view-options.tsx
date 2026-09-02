import type { RowData, Table as TanStackTable } from "@tanstack/react-table"
import {
  ChevronDownIcon,
  RotateCcwIcon,
  SlidersHorizontalIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { DataTableFeatures } from "@/components/table/data-table-features"

export function DataTableViewOptions<TData extends RowData>({
  table,
}: {
  table: TanStackTable<DataTableFeatures, TData>
}) {
  const allColumnsVisible = table
    .getAllLeafColumns()
    .filter((column) => column.getCanHide())
    .every((column) => column.getIsVisible())

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-full justify-between gap-2 bg-background sm:w-auto sm:self-end lg:self-auto"
            aria-label="Choose visible columns"
          />
        }
      >
        <SlidersHorizontalIcon />
        Columns
        <ChevronDownIcon className="size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Display columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={allColumnsVisible}
            onClick={() => table.resetColumnVisibility(true)}
          >
            <RotateCcwIcon />
            Show all columns
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
