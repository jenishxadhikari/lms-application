import { createFileRoute } from "@tanstack/react-router"

import { AuthWrapper } from "@/features/auth/components/auth-wrapper"
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form"

export const Route = createFileRoute("/(auth)/forgot-password")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthWrapper>
      <ForgotPasswordForm />
    </AuthWrapper>
  )
}
