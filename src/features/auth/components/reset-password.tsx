import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Eye, EyeOff, RefreshCwIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
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
import { resetPasswordSchema } from "../schema"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      verificationCode: "",
      password: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
  })

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data.message ?? "Password reset successfully")
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
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-sm text-pretty text-muted-foreground">
            Enter the verification code sent to your email address to reset your
            password.
          </p>
        </div>
        <Controller
          name="verificationCode"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor={field.name}>Verification Code</FieldLabel>

                <Button type="button" variant="outline" size="xs">
                  <RefreshCwIcon />
                  Resend Code
                </Button>
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

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {error && <ErrorAlert message={error} />}
        <Field>
          <SubmitButton label="Reset Password" pending={isPending} />
        </Field>
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
