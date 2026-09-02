import { createFileRoute } from "@tanstack/react-router"

import { AuthWrapper } from "@/features/auth/components/auth-wrapper"
import { SigninForm } from "@/features/auth/components/signin-form"

export const Route = createFileRoute("/(auth)/sign-in")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthWrapper>
      <SigninForm />
    </AuthWrapper>
  )
}
