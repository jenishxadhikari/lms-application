import { useAuth } from "@/auth"
import { createFileRoute, Link } from "@tanstack/react-router"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  const { user, logout } = useAuth()

  return (
    <div className="space-y-4 p-2">
      <h3>Welcome Home!</h3>
      <Link to="/superadmin/dashboard" className={buttonVariants()}>
        Go to Dashboard
      </Link>
      {user && (
        <Card>
          <CardContent className="overflow-x-auto">
            {JSON.stringify(user)}
          </CardContent>
        </Card>
      )}
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}
