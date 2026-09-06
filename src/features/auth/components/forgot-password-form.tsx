import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { cn } from "@/lib/utils"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ErrorAlert } from "@/components/error-alert"
import { SubmitButton } from "@/components/submit-button"

import { forgotPassword } from "../api"
import { forgotPasswordSchema } from "../schema"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
  })

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data.message ?? "Verification code sent to your email")
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
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="text-sm text-pretty text-muted-foreground">
            Enter your email address and we'll send you a verification code to
            reset your password.
          </p>
        </div>
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
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {error && <ErrorAlert message={error} />}
        <Field>
          <SubmitButton label="Send Verification Code" pending={isPending} />
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
