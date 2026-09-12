import { QueryClient } from "@tanstack/react-query"
import { createRouter } from "@tanstack/react-router"

import { routeTree } from "./routeTree.gen"

export const queryClient = new QueryClient()

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    // auth will be passed down from App component
    auth: undefined!,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
  interface HistoryState {
    email?: string
    password?: string
  }
}
