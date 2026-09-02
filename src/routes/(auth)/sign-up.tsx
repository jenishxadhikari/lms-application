import { createFileRoute } from "@tanstack/react-router"

import { AuthWrapper } from "@/features/auth/components/auth-wrapper"
import { SignupForm } from "@/features/auth/components/signup-form"

export const Route = createFileRoute("/(auth)/sign-up")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthWrapper>
      <SignupForm />
    </AuthWrapper>
  )
}
