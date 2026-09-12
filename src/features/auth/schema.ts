import { z } from "zod"

const emailSchema = z.email({ error: "Please enter a valid email." }).trim()

const passwordSchema = z
  .string()
  .min(8, { error: "Must be at least 8 characters long." })
  .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
  .regex(/[0-9]/, { error: "Contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, {
    error: "Contain at least one special character.",
  })
  .trim()

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

export const signinSchema = z.object({
  email: emailSchema,
  password: z.string().nonempty({ error: "Confirm password is required." }),
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const verifyOtpSchema = z.object({
  email: emailSchema,
  password: z.string().nonempty({ error: "Confirm password is required." }),
  otp: z.string().length(6, { error: "Verification code must be 6 digits." }),
})

export const resetPasswordSchema = z.object({
  email: emailSchema,
  verificationCode: z
    .string()
    .length(6, { error: "Verification code must be 6 digits." }),
  newPassword: passwordSchema,
})

export const resendOtpSchema = z.object({
  email: emailSchema,
})
