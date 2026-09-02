import { createFileRoute } from "@tanstack/react-router"

import { AuthWrapper } from "@/features/auth/components/auth-wrapper"
import { VerifyOtpForm } from "@/features/auth/components/verify-otp-form"

export const Route = createFileRoute("/(auth)/verify-otp")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthWrapper>
      <VerifyOtpForm />
    </AuthWrapper>
  )
}
