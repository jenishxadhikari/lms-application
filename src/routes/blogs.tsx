import { createFileRoute } from "@tanstack/react-router"

import { CatalogRoutePage } from "@/features/catalog/components/catalog-page"

export const Route = createFileRoute("/blogs")({
  component: () => <CatalogRoutePage kind="blogs" />,
})
