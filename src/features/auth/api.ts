import { z } from "zod"

import { api, getApiErrorMessage } from "@/lib/api"

import {
  forgotPasswordSchema,
  resendOtpSchema,
  resetPasswordSchema,
  signupSchema,
  verifyOtpSchema,
  type ForgotPasswordResponse,
  type RegisterResponse,
  type ResendOtpResponse,
  type ResetPasswordResponse,
  type VerifyOtpResponse,
} from "./schema"

export async function signup(data: z.infer<typeof signupSchema>) {
  try {
    const res = await api.post<RegisterResponse>("/auth/register", data)
    return res.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Registration failed"))
  }
}

export async function verifyOtp(data: z.infer<typeof verifyOtpSchema>) {
  try {
    const res = await api.post<VerifyOtpResponse>("/auth/register/verify", data)
    return res.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "OTP verification failed"))
  }
}

export async function forgotPassword(
  data: z.infer<typeof forgotPasswordSchema>
) {
  try {
    const res = await api.post<ForgotPasswordResponse>(
      "/auth/forgot-password",
      data
    )
    return res.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Forgot password request failed"))
  }
}

export async function resetPassword(data: z.infer<typeof resetPasswordSchema>) {
  try {
    const res = await api.post<ResetPasswordResponse>(
      "/auth/forgot-password/verify",
      data
    )
    return res.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Reset password request failed"))
  }
}

export async function resendOtp(data: z.infer<typeof resendOtpSchema>) {
  try {
    const res = await api.post<ResendOtpResponse>("/auth/resend-otp", data)
    return res.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Resend OTP request failed"))
  }
}
