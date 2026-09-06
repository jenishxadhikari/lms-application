import { z } from "zod"

import type { createOrganizationSchema } from "./schema"

const apiUrl = import.meta.env.VITE_API_URL
const token = localStorage.getItem("auth-token")

export async function getOrganizations() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await fetch(`${apiUrl}/admin/tenants`, options)
  const organizationData = await res.json()

  if (!res.ok) {
    throw new Error(organizationData.message ?? "Failed to fetch organizations")
  }

  return organizationData
}

export async function createOrganization(
  data: z.infer<typeof createOrganizationSchema>
) {
  const formData = new FormData()

  const request = {
    name: data.name,
    slug: data.slug,
    timezone: data.timezone,
    currency: data.currency.toLowerCase(),
    description: data.description,
    primaryColor: data.primaryColor,
    secondaryColor: data.secondaryColor,
  }

  formData.append(
    "request",
    new Blob([JSON.stringify(request)], {
      type: "application/json",
    })
  )

  if (data.logo) {
    formData.append("logo", data.logo)
  }

  if (data.favicon) {
    formData.append("favicon", data.favicon)
  }

  const res = await fetch(`${apiUrl}/admin/tenant`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  const organizationData = await res.json()

  if (!res.ok) {
    throw new Error(organizationData.message ?? "Failed to create organization")
  }

  return organizationData
}

export async function deleteOrganization(id: string) {
  const res = await fetch(`${apiUrl}/admin/tenant/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const organizationData = await res.json()

  if (!res.ok) {
    throw new Error(organizationData.message ?? "Failed to delete organization")
  }

  return organizationData
}
