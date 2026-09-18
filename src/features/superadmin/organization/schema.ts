import { z } from "zod"

const imageSchema = z
  .file()
  .max(5 * 1024 * 1024, "File must be smaller than 5MB")
  .mime(["image/png", "image/jpeg", "image/webp"])

const hexColorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, "Enter a valid hex color")

export const createOrganizationSchema = z.object({
  name: z.string().trim().min(1, "Organization name is required"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  description: z.string().trim().min(1, "Description is required"),
  primaryColor: hexColorSchema,
  secondaryColor: hexColorSchema,
  timezone: z.string().min(1, "Timezone is required"),
  currency: z.enum(["NPR", "USD"]),
  logo: imageSchema.optional(),
  favicon: imageSchema.optional(),
})

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>

export const updateOrganizationSchema = createOrganizationSchema.extend({
  id: z.uuid("ID is required"),
})

export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>

export type PaginationInfo = {
  total: number
  pageNo: number
  pageSize: number
  totalPages: number
}

export type Organization = {
  id: string
  createdDatetime: string
  status: "ACTIVE" | "INACTIVE"
  name: string
  slug: string
  description: string
  type: "SYSTEM" | "ORGANIZATION"
  logoUrl?: string
  primaryColor: string
  secondaryColor: string
  faviconUrl?: string
  timezone: string
  currency: "npr" | "usd"
}

export type OrganizationsResponse = {
  paginationInfo: PaginationInfo
  tenants: Organization[]
}
