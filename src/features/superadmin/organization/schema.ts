import { z } from "zod"

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5 MB

const imageSchema = z
  .file()
  .max(MAX_IMAGE_SIZE, { message: "Max file size is 5MB." })

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Organization name is required")
    .max(100, "Organization name must be less than 100 characters"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(100, "Slug must be less than 100 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),

  description: z
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),

  timezone: z.string().trim().min(1, "Timezone is required"),

  currency: z
    .string()
    .trim()
    .length(3, "Currency must be a 3-letter ISO code")
    .transform((value) => value.toUpperCase()),

  primaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Enter a valid hex color")
    .optional(),

  secondaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Enter a valid hex color")
    .optional(),

  logo: imageSchema.optional(),

  favicon: imageSchema.optional(),
})

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>
