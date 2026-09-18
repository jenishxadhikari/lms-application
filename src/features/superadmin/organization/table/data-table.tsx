import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  RowData,
} from "@tanstack/react-table"

import { DataTable as BaseDataTable } from "@/components/table/data-table"
import { features } from "@/components/table/data-table-features"

export const typeFilterOptions = [
  { label: "System", value: "SYSTEM" },
  { label: "Organization", value: "ORGANIZATION" },
] as const

export const statusFilterOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
] as const

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<typeof features, TData>[]
  data: TData[]
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
  rowCount: number
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  pagination,
  onPaginationChange,
  rowCount,
}: DataTableProps<TData>) {
  return (
    <BaseDataTable
      columns={columns}
      data={data}
      caption="Organizations, their status, type, location, currency, and available actions."
      itemLabel={{ singular: "organization", plural: "organizations" }}
      search={{
        columnId: "name",
        label: "Search organizations",
        placeholder: "Search by name...",
      }}
      filters={[
        {
          columnId: "type",
          label: "Type",
          allLabel: "All types",
          options: typeFilterOptions,
        },
        {
          columnId: "status",
          label: "Status",
          allLabel: "All statuses",
          options: statusFilterOptions,
        },
      ]}
      emptyState={{
        title: "No organizations yet",
        description: "Organizations will appear here after they are added.",
        filteredTitle: "No matching organizations",
        filteredDescription:
          "Try changing or clearing your search and filters.",
      }}
      initialColumnVisibility={{ description: false }}
      pagination={{ state: pagination, onChange: onPaginationChange, rowCount }}
    />
  )
}
