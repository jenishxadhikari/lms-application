import type { ColumnDef, RowData } from "@tanstack/react-table"

import { DataTable as BaseDataTable } from "@/components/table/data-table"
import { features } from "@/components/table/data-table-features"

const statusFilterOptions = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
] as const

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<typeof features, TData>[]
  data: TData[]
}

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  return (
    <BaseDataTable
      columns={columns}
      data={data}
      caption="Plans, their usage limits, pricing, status, and available actions."
      itemLabel={{ singular: "plan", plural: "plans" }}
      search={{
        columnId: "name",
        label: "Search plans",
        placeholder: "Search by name...",
      }}
      filters={[
        {
          columnId: "isActive",
          label: "Status",
          allLabel: "All statuses",
          options: statusFilterOptions,
        },
      ]}
      emptyState={{
        title: "No plans yet",
        description: "Plans will appear here after they are added.",
        filteredTitle: "No matching plans",
        filteredDescription:
          "Try changing or clearing your search and filters.",
      }}
      tableClassName="min-w-6xl"
    />
  )
}
