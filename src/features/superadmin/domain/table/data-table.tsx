import type { ColumnDef, RowData } from "@tanstack/react-table"

import { DataTable as BaseDataTable } from "@/components/table/data-table"
import { features } from "@/components/table/data-table-features"

const statusFilterOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Pending verification", value: "PENDING_VERIFICATION" },
] as const

const typeFilterOptions = [
  { label: "Nepali Mentor", value: "PLATFORM" },
  { label: "Custom", value: "CUSTOM" },
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
      caption="Domains, their organizations, type, status, creation date, and available actions."
      itemLabel={{ singular: "domain", plural: "domains" }}
      search={{
        columnId: "domain",
        label: "Search domains",
        placeholder: "Search by domain...",
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
        title: "No domains yet",
        description: "Domains will appear here after they are added.",
        filteredTitle: "No matching domains",
        filteredDescription:
          "Try changing or clearing your search and filters.",
      }}
      initialColumnVisibility={{ createdDatetime: false }}
      tableClassName="min-w-[60rem]"
    />
  )
}
