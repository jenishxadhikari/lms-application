import { createFileRoute } from "@tanstack/react-router"

import { AuthWrapper } from "@/features/auth/components/auth-wrapper"
import { ResetPasswordForm } from "@/features/auth/components/reset-password"

export const Route = createFileRoute("/(auth)/reset-password")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthWrapper>
      <ResetPasswordForm />
    </AuthWrapper>
  )
}
