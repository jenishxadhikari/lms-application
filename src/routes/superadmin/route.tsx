import { createFileRoute, Outlet } from "@tanstack/react-router"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { FullscreenButton } from "@/components/fullscreen-button"
import { ModeToggle } from "@/components/mode-toggle"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export const Route = createFileRoute("/superadmin")({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <header className="flex h-14 items-center justify-between gap-2 border-b px-3 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <FullscreenButton />
          </div>
        </header>
        <main className="flex min-w-0 flex-1 flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
