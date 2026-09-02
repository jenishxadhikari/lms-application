import type { HTMLAttributes } from "react"

import type { Column, RowData } from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import type { DataTableFeatures } from "@/components/table/data-table-features"

interface DataTableColumnHeaderProps<
  TData extends RowData,
  TValue,
> extends HTMLAttributes<HTMLDivElement> {
  column: Column<DataTableFeatures, TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const sortDirection = column.getIsSorted()

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "-ml-2 h-8 gap-1.5 px-2 text-xs font-medium text-muted-foreground",
        className
      )}
      onClick={() => column.toggleSorting(sortDirection === "asc")}
    >
      <span>{title}</span>

      {sortDirection === "desc" ? (
        <ArrowDownIcon />
      ) : sortDirection === "asc" ? (
        <ArrowUpIcon />
      ) : (
        <ChevronsUpDownIcon />
      )}
    </Button>
  )
}
