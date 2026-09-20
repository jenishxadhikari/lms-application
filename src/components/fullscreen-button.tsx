import { useEffect, useState } from "react"

import { Maximize2Icon, Minimize2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

interface FullscreenButtonProps {
  className?: string
  variant?: "ghost" | "outline" | "default" | "secondary"
  size?: "default" | "sm" | "xs" | "icon" | "icon-sm" | "icon-xs"
}

export function FullscreenButton({
  className,
  variant = "ghost",
  size = "icon",
}: FullscreenButtonProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await document.documentElement.requestFullscreen()
      }
    } catch (err) {
      console.warn("Fullscreen toggle failed:", err)
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? (
        <Minimize2Icon className="size-4" />
      ) : (
        <Maximize2Icon className="size-4" />
      )}
    </Button>
  )
}
