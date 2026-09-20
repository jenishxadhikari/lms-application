import { useAuth } from "@/auth"
import { useNavigate } from "@tanstack/react-router"
import {
  BadgeCheckIcon,
  BellIcon,
  ChevronDownIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserDropdown() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (!isAuthenticated || !user) {
    return null
  }

  function handleLogout() {
    logout()
    navigate({ to: "/" })
  }

  const displayName = user.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : "User"
  const displayEmail = user.email || ""
  const initials = user.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] || ""}`.toUpperCase()
    : "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group">
        <span className="flex h-9 max-w-56 cursor-pointer items-center gap-1 rounded-lg px-1 text-left transition-colors group-focus-visible:ring-2 group-focus-visible:ring-ring hover:bg-muted active:scale-[0.98] sm:h-10 sm:gap-2 sm:px-2">
          <Avatar className="size-8 sm:size-9">
            <AvatarImage src={user.avatarUrl} alt={displayName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden min-w-0 flex-1 leading-tight xl:grid">
            <span className="truncate text-sm font-semibold text-foreground">
              {displayName}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {displayEmail}
            </span>
          </span>
          <ChevronDownIcon className="hidden size-4 shrink-0 text-muted-foreground sm:block" />
          <span className="sr-only">Open user menu</span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[min(14rem,calc(100vw-1rem))] min-w-0"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate({ to: "/superadmin/dashboard" })}
          >
            <LayoutDashboardIcon className="size-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <BadgeCheckIcon className="size-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <CreditCardIcon className="size-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <BellIcon className="size-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={handleLogout}
        >
          <LogOutIcon className="size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
