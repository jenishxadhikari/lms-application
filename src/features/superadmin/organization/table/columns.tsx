import { createColumnHelper } from "@tanstack/react-table"
import {
  Building2Icon,
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import type { DataTableFeatures } from "@/components/table/data-table-features"

import { DeleteOrganization } from "../components/delete-organization"
import type { Organization } from "./type"

const columnHelper = createColumnHelper<DataTableFeatures, Organization>()

export const organizationColumns = columnHelper.columns([
  columnHelper.accessor(
    (organization) => `${organization.name} ${organization.slug}`,
    {
      id: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Organization" />
      ),
      filterFn: "includesString",
      enableHiding: false,
      cell: ({ row }) => {
        const organization = row.original

        return (
          <div className="flex min-w-60 items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/10">
              <Building2Icon className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate font-medium text-foreground">
                {organization.name}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {organization.slug}
              </div>
            </div>
          </div>
        )
      },
    }
  ),
  columnHelper.accessor("description", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <span className="block max-w-[30ch] truncate text-sm text-muted-foreground">
        {row.original.description}
      </span>
    ),
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
              active ? "bg-emerald-500" : "bg-muted-foreground"
            )}
          />
          {active ? "Active" : "Inactive"}
        </Badge>
      )
    },
  }),
  columnHelper.accessor("type", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    filterFn: "equals",
    cell: ({ row }) => {
      const system = row.original.type === "SYSTEM"

      return (
        <Badge
          variant="outline"
          className="gap-1.5 bg-muted/30 font-normal text-muted-foreground"
        >
          {system ? <ShieldCheckIcon /> : <Building2Icon />}
          {system ? "System" : "Organization"}
        </Badge>
      )
    },
  }),
  columnHelper.accessor("timezone", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time zone" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.timezone}
      </span>
    ),
  }),
  columnHelper.accessor("currency", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium tabular-nums">
        {row.original.currency}
      </span>
    ),
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
    cell: ({ row }) => {
      const organization = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground data-popup-open:bg-muted"
                />
              }
            >
              <MoreHorizontalIcon />
              <span className="sr-only">
                Open actions for {organization.name}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="truncate">
                  {organization.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <EyeIcon />
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PencilIcon />
                  Edit organization
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DeleteOrganization id={organization.id} />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  }),
])
