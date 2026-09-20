import * as React from "react"

import { Link } from "@tanstack/react-router"
import {
  BookOpenIcon,
  LifeBuoyIcon,
  NewspaperIcon,
  PresentationIcon,
  StoreIcon,
  UsersIcon,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/sidebar/nav-user"

export const HOMEPAGE_SIDEBAR_ITEMS = [
  {
    title: "Courses",
    url: "/courses",
    icon: <BookOpenIcon className="size-4" />,
  },
  {
    title: "Workshop",
    url: "/workshops",
    icon: <PresentationIcon className="size-4" />,
  },
  {
    title: "Mentorship",
    url: "/mentorships",
    icon: <UsersIcon className="size-4" />,
    badge: "1-on-1",
  },
  {
    title: "Marketplace",
    url: "/marketplace",
    icon: <StoreIcon className="size-4" />,
  },
  {
    title: "Blog",
    url: "/blogs",
    icon: <NewspaperIcon className="size-4" />,
  },
  {
    title: "Contact Us",
    url: "/contact-us",
    icon: <LifeBuoyIcon className="size-4" />,
  },
]

export function HomeSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { setOpen, setOpenMobile, isMobile } = useSidebar()

  const closeSidebar = () => {
    if (isMobile) {
      setOpenMobile(false)
    } else {
      setOpen(false)
    }
  }

  return (
    <Sidebar
      collapsible="offcanvas"
      className={cn(
        "z-50 border-sidebar-border bg-sidebar text-sidebar-foreground shadow-2xl [&_[data-slot=sidebar-inner]]:bg-sidebar [&_[data-slot=sidebar-inner]]:text-sidebar-foreground",
        className
      )}
      {...props}
    >
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar p-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            aria-label="NepaliMentor home"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-[11px] font-bold tracking-tight text-sidebar-primary-foreground ring-1 ring-sidebar-border">
              NM
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold tracking-tight text-sidebar-foreground">
                NepaliMentor
              </span>
              <span className="truncate text-xs text-sidebar-foreground/60">
                Learning Platform
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={closeSidebar}
            className="flex size-8 cursor-pointer items-center justify-center rounded-md text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground active:scale-95"
            aria-label="Close menu"
          >
            <X className="size-4" />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0 bg-sidebar px-2 py-1">
        <SidebarGroup className="pt-0">
          <SidebarGroupLabel className="text-[11px] font-semibold tracking-wider text-sidebar-foreground/50 uppercase">
            Menu
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {HOMEPAGE_SIDEBAR_ITEMS.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="homepage-menu-item h-8 text-sm leading-none font-medium text-sidebar-foreground/85"
                  render={<a href={item.url} />}
                >
                  {item.icon}
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <span className="rounded-full border border-current/20 bg-current/10 px-1.5 py-0.5 text-[9px] font-bold uppercase">
                      {item.badge}
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-sidebar p-3">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
