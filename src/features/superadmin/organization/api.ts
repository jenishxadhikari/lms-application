import { api, getApiErrorMessage } from "@/lib/api"

import type {
  CreateOrganizationInput,
  OrganizationsResponse,
  UpdateOrganizationInput,
} from "./schema"

export async function getOrganizations() {
  try {
    const res = await api.get<OrganizationsResponse>("/admin/tenants")
    return res.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch organizations"))
  }
}

export async function createOrganization(data: CreateOrganizationInput) {
  try {
    const request = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      timezone: data.timezone,
      currency: data.currency,
    }

    const formData = new FormData()
    formData.append(
      "request",
      new Blob([JSON.stringify(request)], { type: "application/json" })
    )
    if (data.logo) {
      formData.append("logo", data.logo)
    }
    if (data.favicon) {
      formData.append("favicon", data.favicon)
    }

    await api.post("/admin/tenant", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to create organization"))
  }
}

export async function updateOrganization(data: UpdateOrganizationInput) {
  try {
    const request = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      timezone: data.timezone,
      currency: data.currency,
    }

    const formData = new FormData()
    formData.append(
      "request",
      new Blob([JSON.stringify(request)], { type: "application/json" })
    )
    if (data.logo) {
      formData.append("logo", data.logo)
    }
    if (data.favicon) {
      formData.append("favicon", data.favicon)
    }

    await api.post("/admin/tenant", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to update organization"))
  }
}

export async function deleteOrganization(organizationId: string) {
  try {
    await api.delete(`/admin/tenant/${organizationId}`)
    return
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to delete organization"))
  }
}
