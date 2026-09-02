import { createFileRoute, notFound } from "@tanstack/react-router"

export const Route = createFileRoute("/superadmin/")({
  beforeLoad: () => {
    throw notFound()
  },
})
