import type { AuthState } from "@/auth"
import type { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { Toaster } from "sonner"

import { NotFound } from "@/components/not-found"
import { ThemeProvider } from "@/components/theme-provider"

interface MyRouterContext {
  queryClient: QueryClient
  auth: AuthState
}

const RootLayout = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Toaster richColors />
    <Outlet />
    <TanStackRouterDevtools />
  </ThemeProvider>
)

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
  notFoundComponent: () => <NotFound />,
})
