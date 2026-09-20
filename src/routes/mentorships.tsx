import { createFileRoute } from "@tanstack/react-router"

import { CatalogRoutePage } from "@/features/catalog/components/catalog-page"

export const Route = createFileRoute("/mentorships")({
  component: () => <CatalogRoutePage kind="mentorships" />,
})
