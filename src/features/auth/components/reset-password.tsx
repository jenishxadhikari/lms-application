import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Link, useLocation, useNavigate } from "@tanstack/react-router"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Eye, EyeOff } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "@/components/ui/button"
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

import { resetPassword } from "../api"
import { resetPasswordSchema, type ResetPasswordData } from "../schema"
import { ResendOTPButton } from "./resend-otp-button"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { state } = useLocation()
  const email = state.email

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email,
      otp: "",
      newPassword: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
  })

  async function onSubmit(formData: ResetPasswordData) {
    mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message ?? "Password reset successful.")
        navigate({ to: "/sign-in" })
      },
      onError: (error) => {
        setError(error.message)
      },
    })
  }

  return (
    <form
      id="reset-password-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup className="gap-6">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="text-sm text-pretty text-muted-foreground">
            Enter the verification code sent to your email address
          </p>
        </div>
        {email ? (
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
                    <ResendOTPButton email={email} otpType="PASSWORD_RESET" />
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
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="********"
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {error && <ErrorAlert message={error} />}
            <Field>
              <SubmitButton label="Reset Password" pending={isPending} />
            </Field>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-destructive">
              No email found. Please start the password reset process again.
            </h2>
            <Link to="/forgot-password" className={buttonVariants()}>
              Forgot Password
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
