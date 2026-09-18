import { z } from "zod"

export const createPlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  maxStudents: z.number().int().min(1, "Max students must be at least 1"),
  maxMentors: z.number().int().min(1, "Max mentors must be at least 1"),
  maxCourses: z.number().int().min(1, "Max courses must be at least 1"),
  storageGB: z.number().int().min(1, "Storage GB must be at least 1"),
  priceMonthly: z.number().min(0, "Price monthly must be at least 0"),
  priceYearly: z.number().min(0, "Price yearly must be at least 0"),
})

export type CreatePlanInput = z.infer<typeof createPlanSchema>

export const updatePlanSchema = createPlanSchema.extend({
  id: z.uuid("ID is required"),
})

export type UpdatePlanInput = z.infer<typeof updatePlanSchema>

export type Plan = {
  id: string
  name: string
  code: string
  maxStudents: number
  maxMentors: number
  maxCourses: number
  storageGB: number
  priceMonthly: number
  priceYearly: number
  isActive: boolean
}

export type PlansResponse = {
  plans: Plan[]
}
