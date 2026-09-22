import { createColumnHelper } from "@tanstack/react-table"
import { Globe2Icon, Link2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import type { DataTableFeatures } from "@/components/table/data-table-features"

import type { Domain } from "../schema"
import { DomainActions } from "./actions"

const columnHelper = createColumnHelper<DataTableFeatures, Domain>()

export const domainColumns = columnHelper.columns([
  columnHelper.accessor("domain", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Domain" />
    ),
    filterFn: "includesString",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex min-w-52 items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/10">
          <Globe2Icon className="size-4" />
        </span>
        <span className="max-w-[36ch] truncate font-medium text-foreground">
          {row.original.domain}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organization" />
    ),
    cell: ({ row }) => (
      <span className="block max-w-[24ch] truncate text-sm text-muted-foreground">
        {row.original.name}
      </span>
    ),
  }),
  columnHelper.accessor("type", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    filterFn: "equals",
    cell: ({ row }) => {
      const custom = row.original.type === "CUSTOM"
      return (
        <Badge
          variant="outline"
          className="gap-1.5 bg-muted/30 font-normal text-muted-foreground"
        >
          {custom ? <Link2Icon /> : <Globe2Icon />}
          {custom ? "Custom" : "Nepali Mentor"}
        </Badge>
      )
    },
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    filterFn: "equals",
    cell: ({ row }) => {
      const active = row.original.status === "ACTIVE"
      return (
        <Badge
          variant="outline"
          className={cn(
            "gap-1.5 font-normal",
            active
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-400"
              : "bg-muted/50 text-muted-foreground"
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 rounded-full",
              active ? "bg-emerald-500" : "bg-yellow-500"
            )}
          />
          {active ? "Active" : "Pending verification"}
        </Badge>
      )
    },
  }),
  columnHelper.accessor("createdDatetime", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdDatetime)
      return (
        <span className="text-sm text-muted-foreground tabular-nums">
          {Number.isNaN(date.getTime())
            ? "Not available"
            : new Intl.DateTimeFormat(undefined, {
                dateStyle: "medium",
              }).format(date)}
        </span>
      )
    },
  }),
  columnHelper.display({
    header: () => (
      <span className="-ml-2 h-8 gap-1.5 px-2 text-xs font-medium text-muted-foreground">
        Actions
      </span>
    ),
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => <DomainActions domain={row.original} />,
  }),
])
