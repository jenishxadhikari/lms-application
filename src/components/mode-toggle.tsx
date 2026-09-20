import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

interface ModeToggleProps {
  className?: string
  variant?: "ghost" | "outline" | "default" | "secondary"
  size?: "default" | "sm" | "xs" | "icon" | "icon-sm" | "icon-xs"
}

export function ModeToggle({
  className,
  variant = "ghost",
  size = "icon",
}: ModeToggleProps) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle light or dark theme"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
