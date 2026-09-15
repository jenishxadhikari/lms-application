import axios from "axios"

import { getAuthToken } from "@/lib/auth-token"
import { config } from "@/lib/config"
import type { ApiErrorResponse } from "@/types/api"

export const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = getAuthToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data.message ?? fallbackMessage
  }

  return fallbackMessage
}
