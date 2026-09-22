import { z } from "zod"

export const PLATFORM_DOMAIN_SUFFIX = ".nepalimentor.com"

const platformDomainPattern =
  /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.nepalimentor\.com$/

export const createDomainSchema = z
  .object({
    domain: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Domain is required")
      .regex(
        /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/,
        "Enter a valid domain, such as example.com"
      ),
    tenantId: z.uuid("Select an organization"),
    type: z.enum(["PLATFORM", "CUSTOM"]),
  })
  .superRefine(({ domain, type }, context) => {
    if (!domain) return

    if (type === "PLATFORM" && !platformDomainPattern.test(domain)) {
      context.addIssue({
        code: "custom",
        path: ["domain"],
        message: "Enter a single subdomain for your Nepali Mentor address",
      })
    }

    if (
      type === "CUSTOM" &&
      (domain === "nepalimentor.com" || domain.endsWith(PLATFORM_DOMAIN_SUFFIX))
    ) {
      context.addIssue({
        code: "custom",
        path: ["domain"],
        message: "Enter a domain you own outside nepalimentor.com",
      })
    }
  })

export type CreateDomainInput = z.infer<typeof createDomainSchema>

export const updateDomainSchema = createDomainSchema.safeExtend({
  id: z.uuid("ID is required"),
})

export type UpdateDomainInput = z.infer<typeof updateDomainSchema>

export type Domain = {
  id: string
  createdDatetime: string
  type: "PLATFORM" | "CUSTOM"
  status: "ACTIVE" | "PENDING_VERIFICATION"
  domain: string
  verifiedAt?: string | null
  verificationToken?: string | null
  verificationRecordName?: string | null
  verificationRecordValue?: string | null
  tenantId: string
  name: string
}

export type DomainsResponse = {
  domains: Domain[]
}
