import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import { Toaster } from "@/components/ui/toast"
import { NotFound } from "@/components/not-found"
import { ThemeProvider } from "@/components/theme-provider"

const RootLayout = () => (
  <ThemeProvider storageKey="vite-ui-theme">
    <Toaster />
    <Outlet />
    <TanStackRouterDevtools position="bottom-left" />
  </ThemeProvider>
)

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <NotFound />,
})
