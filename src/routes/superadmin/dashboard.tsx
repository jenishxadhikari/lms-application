import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/superadmin/dashboard")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/superadmin/dashboard"!</div>
}
