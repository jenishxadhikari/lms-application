export type Organization = {
  id: string
  name: string
  slug: string
  type: "SYSTEM" | "ORGANIZATION"
  status: "ACTIVE" | "INACTIVE"
  description: string
  timezone: string
  currency: string
  createdAt: string
}

export const typeFilterOptions = [
  { label: "System", value: "SYSTEM" },
  { label: "Organization", value: "ORGANIZATION" },
] as const

export const statusFilterOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
] as const
