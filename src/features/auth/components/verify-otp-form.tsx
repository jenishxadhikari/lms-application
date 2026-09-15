import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Link, useLocation, useNavigate } from "@tanstack/react-router"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { ErrorAlert } from "@/components/error-alert"
import { SubmitButton } from "@/components/submit-button"

import { verifyOtp } from "../api"
import { verifyOtpSchema, type VerifyOtpData } from "../schema"
import { ResendOTPButton } from "./resend-otp-button"

export function VerifyOtpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const { state } = useLocation()
  const email = state.email
  const password = state.password

  const form = useForm<VerifyOtpData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: email,
      otp: "",
      password: password,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: verifyOtp,
  })

  async function onSubmit(formData: VerifyOtpData) {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Verification successful.")
        navigate({
          to: "/sign-in",
        })
      },
      onError: (error) => {
        setError(error.message)
      },
    })
  }

  return (
    <form
      id="forgot-password-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup className="gap-6">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Verify OTP</h1>
          <p className="text-sm text-pretty text-muted-foreground">
            Please enter the verification code sent to your email.
          </p>
        </div>
        {email && password ? (
          <>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="m@example.com"
                    aria-invalid={fieldState.invalid}
                    disabled
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="otp"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>
                      Verification Code
                    </FieldLabel>
                    <ResendOTPButton email={email} otpType="REGISTRATION" />
                  </div>
                  <InputOTP
                    {...field}
                    id={field.name}
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot className="h-10 flex-1 text-xl" index={0} />
                      <InputOTPSlot className="h-10 flex-1 text-xl" index={1} />
                      <InputOTPSlot className="h-10 flex-1 text-xl" index={2} />
                      <InputOTPSlot className="h-10 flex-1 text-xl" index={3} />
                      <InputOTPSlot className="h-10 flex-1 text-xl" index={4} />
                      <InputOTPSlot className="h-10 flex-1 text-xl" index={5} />
                    </InputOTPGroup>
                  </InputOTP>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {error && <ErrorAlert message={error} />}
            <Field>
              <SubmitButton label="Verify OTP" pending={isPending} />
            </Field>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-destructive">
              No email found. Please start the signup process again.
            </h2>
            <Link to="/sign-up" className={buttonVariants()}>
              Sign Up
            </Link>
          </div>
        )}

        <Field>
          <FieldDescription className="text-center">
            Return to login?{" "}
            <Link to="/sign-in" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
