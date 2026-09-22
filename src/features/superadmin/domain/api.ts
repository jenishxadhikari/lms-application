import { api, getApiErrorMessage } from "@/lib/api"

import type {
  CreateDomainInput,
  DomainsResponse,
  UpdateDomainInput,
} from "./schema"

export async function getDomains() {
  try {
    const res = await api.get<DomainsResponse>("/admin/tenants/domains")
    return res.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch domains"), {
      cause: error,
    })
  }
}

export async function createDomain(data: CreateDomainInput) {
  try {
    await api.post("/admin/domain", data)
    return
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to create domain"), {
      cause: error,
    })
  }
}

export async function updateDomain(data: UpdateDomainInput) {
  try {
    await api.post("/admin/domain", data)
    return
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to update domain"), {
      cause: error,
    })
  }
}

export async function deleteDomain(domainId: string) {
  try {
    await api.delete(`/admin/domain/${domainId}`)
    return
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to delete domain"), {
      cause: error,
    })
  }
}

export async function verifyDomain(domainId: string) {
  try {
    await api.post(`/admin/domain/${domainId}/verify`)
    return
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to verify domain"), {
      cause: error,
    })
  }
}
