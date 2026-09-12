import { createFileRoute, Link } from "@tanstack/react-router"

import { buttonVariants } from "@/components/ui/button"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Link to="/superadmin/dashboard" className={buttonVariants()}>
        Go to Dashboard
      </Link>
    </div>
  )
}
