import React, { createContext, useContext, useEffect, useState } from "react"

import { api, getApiErrorMessage } from "@/lib/api"
import { getAuthToken, removeAuthToken, setAuthToken } from "@/lib/auth-token"

import { Spinner } from "@/components/ui/spinner"

import type {
  LoginResponse,
  SigninData,
  UserResponse,
  UserRole,
} from "@/features/auth/schema"

import { queryClient } from "./router"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl?: string
  role: UserRole
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (data: SigninData) => Promise<LoginResponse>
  googleLogin: (token: string) => Promise<LoginResponse>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = user !== null
  const [isLoading, setIsLoading] = useState(true)

  // Restore auth state on app load
  useEffect(() => {
    async function auth() {
      const token = getAuthToken()
      if (!token) {
        setIsLoading(false)
        return
      }
      // Validate token with your API
      try {
        const res = await api.get<UserResponse>("/user/me")
        const result = res.data

        setUser({
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          avatarUrl: result.avatarUrl,
          role: result.tenantUser.role,
        })
      } catch (error) {
        removeAuthToken()
        throw new Error(getApiErrorMessage(error, "Token validation failed"))
      } finally {
        setIsLoading(false)
      }
    }

    auth()
  }, [])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  async function login(data: SigninData) {
    try {
      const res = await api.post<LoginResponse>("/auth/login", data)
      const result = res.data

      // Store token for persistence
      setAuthToken(result.accessToken)
      setUser({
        id: result.user.id,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        avatarUrl: result.user.avatarUrl,
        role: result.user.tenantUser.role,
      })

      return result
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Login failed"))
    }
  }

  async function googleLogin(token: string) {
    try {
      const res = await api.post<LoginResponse>("/auth/google", {
        idToken: token,
      })
      const result = res.data

      // Store token for persistence
      setAuthToken(result.accessToken)
      setUser({
        id: result.user.id,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        avatarUrl: result.user.avatarUrl,
        role: result.user.tenantUser.role,
      })

      return result
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Google login failed"))
    }
  }

  function logout() {
    queryClient.clear()
    setUser(null)
    removeAuthToken()
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, googleLogin }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
