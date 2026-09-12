import React, { createContext, useContext, useEffect, useState } from "react"

import type z from "zod"

import { getAuthToken, removeAuthToken, setAuthToken } from "@/lib/auth-token"
import { config } from "@/lib/config"

import type { signinSchema } from "@/features/auth/schema"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl: string
  role: "SUPERADMIN" | "ADMIN" | "OWNER" | "MENTOR" | "STUDENT"
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (data: z.infer<typeof signinSchema>) => Promise<any>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const res = await fetch(`${config.apiUrl}/user/me`, options)
        const result = await res.json()
        if (!res.ok) {
          throw new Error("Token validation failed")
        }
        setUser({
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          avatarUrl: result.avatarUrl,
          role: result.designation.toUpperCase(),
        })
        setIsAuthenticated(true)
      } catch {
        removeAuthToken()
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
        Loading...
      </div>
    )
  }

  const login = async (data: z.infer<typeof signinSchema>) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    const res = await fetch(`${config.apiUrl}/auth/login`, options)
    const result = await res.json()
    if (!res.ok) {
      throw new Error(result.message ?? "Login failed")
    }

    setUser({
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      avatarUrl: result.avatarUrl,
      role: result.designation,
    })
    setIsAuthenticated(true)
    // Store token for persistence
    setAuthToken(result.accessToken)

    return result
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    removeAuthToken()
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
