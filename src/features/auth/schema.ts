import { z } from "zod"

const emailSchema = z.email({ error: "Please enter a valid email." }).trim()

const passwordSchema = z
  .string()
  .trim()
  .min(8, { error: "Must be at least 8 characters long." })
  .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
  .regex(/[0-9]/, { error: "Contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, {
    error: "Contain at least one special character.",
  })

export const signupSchema = z
  .object({
    firstName: z.string().nonempty({ error: "Please enter your full name." }),
    lastName: z.string().nonempty({ error: "Please enter your full name." }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string()
      .nonempty({ error: "Confirm password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password do no match.",
    path: ["confirmPassword"],
  })

export type SignupData = z.infer<typeof signupSchema>

export const signinSchema = z.object({
  email: emailSchema,
  password: z.string().nonempty({ error: "Confirm password is required." }),
})

export type SigninData = z.infer<typeof signinSchema>

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>

export const verifyOtpSchema = z.object({
  email: emailSchema,
  password: z.string().nonempty({ error: "Confirm password is required." }),
  otp: z.string().length(6, { error: "Verification code must be 6 digits." }),
})

export type VerifyOtpData = z.infer<typeof verifyOtpSchema>

export const resetPasswordSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, { error: "Verification code must be 6 digits." }),
  newPassword: passwordSchema,
})

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export const resendOtpSchema = z.object({
  email: emailSchema,
  otpType: z.enum(["REGISTRATION", "PASSWORD_RESET"]),
})

export type ResendOtpData = z.infer<typeof resendOtpSchema>

export type UserStatus = "ACTIVE" | "INACTIVE"

export type UserRole = "SUPERADMIN" | "ADMIN" | "MENTOR" | "STUDENT"

export type TenantUser = {
  id: string
  userId: string
  tenantId: string
  role: UserRole
  designation?: string
  signatureUrl?: string
}

export type UserResponse = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl?: string
  aboutMe?: string
  designation?: string
  signatureUrl?: string
  status: UserStatus
  isEmailVerified: boolean
  createdDatetime?: string
  tenantUser: TenantUser
}

export type LoginResponse = {
  accessToken: string
  user: UserResponse
}

export type RegisterResponse = {
  message: string
}

export type VerifyOtpResponse = {
  email: string
  firstName: string
  id: string
  isEmailVerified: boolean
  lastName: string
  status: UserStatus
  tenantUser: TenantUser
}

export type ForgotPasswordResponse = {
  message: string
}

export type ResetPasswordResponse = {
  message: string
}

export type ResendOtpResponse = {
  message: string
}
