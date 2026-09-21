import { createColumnHelper } from "@tanstack/react-table"
import { PackageIcon } from "lucide-react"

import { currency } from "@/lib/helper"
import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import type { DataTableFeatures } from "@/components/table/data-table-features"

import type { Plan } from "../schema"
import { PlanActions } from "./actions"

const columnHelper = createColumnHelper<DataTableFeatures, Plan>()

export const planColumns = columnHelper.columns([
  columnHelper.accessor((plan) => `${plan.name} ${plan.code}`, {
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    filterFn: "includesString",
    enableHiding: false,
    cell: ({ row }) => {
      const plan = row.original

      return (
        <div className="flex min-w-44 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/10">
            <PackageIcon className="size-4" />
          </span>
          <span className="truncate font-medium text-foreground">
            {plan.name}
          </span>
        </div>
      )
    },
  }),
  columnHelper.accessor("code", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => (
      <span className="block max-w-[30ch] truncate text-sm text-muted-foreground">
        {row.original.code}
      </span>
    ),
  }),
  columnHelper.accessor("maxStudents", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Students" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground tabular-nums">
        {row.original.maxStudents.toLocaleString()}
      </span>
    ),
  }),
  columnHelper.accessor("maxCourses", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Courses" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground tabular-nums">
        {row.original.maxCourses.toLocaleString()}
      </span>
    ),
  }),
  columnHelper.accessor("storageGB", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Storage" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground tabular-nums">
        {row.original.storageGB.toLocaleString()} GB
      </span>
    ),
  }),
  columnHelper.accessor("priceMonthly", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monthly Price" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium tabular-nums">
        {currency.format(row.original.priceMonthly)}
      </span>
    ),
  }),
  columnHelper.accessor("priceYearly", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Yearly Price" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium tabular-nums">
        {currency.format(row.original.priceYearly)}
      </span>
    ),
  }),
  columnHelper.accessor("isActive", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    filterFn: "equals",
    cell: ({ row }) => {
      const active = row.original.isActive

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
              active ? "bg-emerald-500" : "bg-muted-foreground"
            )}
          />
          {active ? "Active" : "Inactive"}
        </Badge>
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
    cell: ({ row }) => <PlanActions plan={row.original} />,
  }),
])
