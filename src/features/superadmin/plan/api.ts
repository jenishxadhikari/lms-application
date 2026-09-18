import { api, getApiErrorMessage } from "@/lib/api"

import type { CreatePlanInput, PlansResponse, UpdatePlanInput } from "./schema"

export async function getPlans() {
  try {
    const res = await api.get<PlansResponse>("/admin/plans")
    return res.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch plans"), {
      cause: error,
    })
  }
}

export async function createPlan(data: CreatePlanInput) {
  try {
    await api.post("/admin/plan", data)
    return
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to create plan"), {
      cause: error,
    })
  }
}

export async function updatePlan(data: UpdatePlanInput) {
  try {
    await api.post("/admin/plan", data)
    return
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to update plan"), {
      cause: error,
    })
  }
}

export async function deletePlan(planId: string) {
  try {
    await api.delete(`/admin/plan/${planId}`)
    return
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to delete plan"), {
      cause: error,
    })
  }
}
