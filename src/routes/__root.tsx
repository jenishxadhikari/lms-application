import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import { Toaster } from "@/components/ui/sonner"
import { NotFound } from "@/components/not-found"
import { ThemeProvider } from "@/components/theme-provider"

const RootLayout = () => (
  <ThemeProvider storageKey="vite-ui-theme">
    <Toaster richColors />
    <Outlet />
    <TanStackRouterDevtools position="bottom-left" />
  </ThemeProvider>
)

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <NotFound />,
})
