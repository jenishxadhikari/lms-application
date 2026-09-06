import { z } from "zod"

import {
  forgotPasswordSchema,
  resendOtpSchema,
  resetPasswordSchema,
  signinSchema,
  signupSchema,
  verifyOtpSchema,
} from "./schema"

const apiUrl = import.meta.env.VITE_API_URL

export async function signup(data: z.infer<typeof signupSchema>) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  const res = await fetch(`${apiUrl}/auth/register`, options)
  const registerData = await res.json()

  if (!res.ok) {
    throw new Error(registerData.message ?? "Registration failed")
  }

  return registerData
}

export async function signin(data: z.infer<typeof signinSchema>) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  const res = await fetch(`${apiUrl}/auth/login`, options)
  const loginData = await res.json()

  if (!res.ok) {
    throw new Error(loginData.message ?? "Login failed")
  }

  return loginData
}

export async function forgotPassword(
  data: z.infer<typeof forgotPasswordSchema>
) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  const res = await fetch(`${apiUrl}/auth/forgot-password`, options)
  const forgotPasswordData = await res.json()

  if (!res.ok) {
    throw new Error(
      forgotPasswordData.message ?? "Forgot password request failed"
    )
  }

  return forgotPasswordData
}

export async function resetPassword(data: z.infer<typeof resetPasswordSchema>) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  const res = await fetch(`${apiUrl}/auth/forgot-password/verify`, options)
  const resetPasswordData = await res.json()

  if (!res.ok) {
    throw new Error(
      resetPasswordData.message ?? "Reset password request failed"
    )
  }

  return resetPasswordData
}

export async function verifyOtp(data: z.infer<typeof verifyOtpSchema>) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  const res = await fetch(`${apiUrl}/auth/register/verify`, options)
  const verifyOtpData = await res.json()

  if (!res.ok) {
    throw new Error(verifyOtpData.message ?? "OTP verification failed")
  }

  return verifyOtpData
}

export async function resendOtp(data: z.infer<typeof resendOtpSchema>) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  const res = await fetch(`${apiUrl}/auth/resend-otp`, options)
  const resendOtpData = await res.json()

  if (!res.ok) {
    throw new Error(resendOtpData.message ?? "Resend OTP request failed")
  }

  return resendOtpData
}
