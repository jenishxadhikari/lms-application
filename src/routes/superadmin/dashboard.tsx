import { useAuth } from "@/auth"
import { createFileRoute } from "@tanstack/react-router"

import { Card, CardContent } from "@/components/ui/card"

export const Route = createFileRoute("/superadmin/dashboard")({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth()
  return (
    <div className="flex flex-col gap-4">
      <h1>Hello "/superadmin/dashboard"!</h1>
      <Card>
        <CardContent className="overflow-x-auto">
          {JSON.stringify(user)}
        </CardContent>
      </Card>
    </div>
  )
}
