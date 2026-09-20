import { useEffect, useRef, useState } from "react"

import {
  Laptop,
  Maximize2,
  Minimize2,
  Moon,
  Palette,
  Settings2,
  Sun,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { useTheme } from "@/components/theme-provider"

export function FloatingThemeCustomizer() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const toggleFullscreen = async () => {
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
    <div
      ref={panelRef}
      className="fixed top-1/2 right-3 z-[60] flex -translate-y-1/2 flex-col items-end sm:right-4"
      aria-label="Theme & Display Customizer"
    >
      {/* Expanded Quick Settings Panel */}
      {isOpen && (
        <div className="mb-2 w-64 animate-in rounded-2xl border border-zinc-300 bg-white p-4 shadow-2xl duration-200 zoom-in-95 fade-in slide-in-from-right-4 dark:border-zinc-800 dark:bg-zinc-950">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg border border-border bg-muted/60 text-foreground dark:border-zinc-800">
                <Palette className="size-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  Theme &amp; View
                </h4>
                <p className="text-[10px] text-muted-foreground">
                  Customize appearance
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex size-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close panel"
            >
              <X className="size-3.5" />
            </button>
          </div>

          {/* Theme Mode Selector */}
          <div className="mt-3.5">
            <label className="text-[11px] font-black tracking-wider text-muted-foreground uppercase">
              Appearance
            </label>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[11px] font-bold transition-all",
                  theme === "light"
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-xs dark:border-white dark:bg-white dark:text-zinc-950"
                    : "border-border/80 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Sun className="size-4" />
                <span>Light</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[11px] font-bold transition-all",
                  theme === "dark"
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-xs dark:border-white dark:bg-white dark:text-zinc-950"
                    : "border-border/80 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Moon className="size-4" />
                <span>Dark</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("system")}
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[11px] font-bold transition-all",
                  theme === "system"
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-xs dark:border-white dark:bg-white dark:text-zinc-950"
                    : "border-border/80 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Laptop className="size-4" />
                <span>System</span>
              </button>
            </div>
          </div>

          {/* Screen Mode */}
          <div className="mt-4 border-t border-border/70 pt-3">
            <label className="text-[11px] font-black tracking-wider text-muted-foreground uppercase">
              Display Mode
            </label>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="mt-2 flex w-full cursor-pointer items-center justify-between rounded-xl border border-border/80 bg-muted/40 px-3 py-2 text-xs font-bold text-foreground transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-2">
                {isFullscreen ? (
                  <Minimize2 className="size-3.5 text-foreground" />
                ) : (
                  <Maximize2 className="size-3.5 text-foreground" />
                )}
                <span>
                  {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground">
                {isFullscreen ? "Active" : "Standard"}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Dock Bar - High Contrast Solid Badge */}
      <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-zinc-800/90 bg-zinc-950 p-1.5 text-white shadow-[0_8px_30px_rgb(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-[0_8px_30px_rgb(0,0,0,0.6)]">
        {/* Direct Theme Toggle Button */}
        <button
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex size-8.5 cursor-pointer items-center justify-center rounded-xl text-zinc-200 transition-all hover:bg-white/20 hover:text-white active:scale-95"
          title={
            theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
          }
          aria-label="Toggle light/dark theme mode"
        >
          {theme === "light" ? (
            <Moon className="size-4.5 text-white transition-transform hover:rotate-12" />
          ) : (
            <Sun className="size-4.5 text-white transition-transform hover:rotate-45" />
          )}
          <span className="sr-only">Toggle theme</span>
        </button>

        {/* Direct Fullscreen Button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="flex size-8.5 cursor-pointer items-center justify-center rounded-xl text-zinc-200 transition-all hover:bg-white/20 hover:text-white active:scale-95"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? (
            <Minimize2 className="size-4 text-white" />
          ) : (
            <Maximize2 className="size-4 text-white" />
          )}
        </button>

        {/* Contrast Divider */}
        <div className="h-px w-5 bg-zinc-800 dark:bg-zinc-700" />

        {/* Theme Customizer Popup Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex size-8.5 cursor-pointer items-center justify-center rounded-xl transition-all",
            isOpen
              ? "scale-105 bg-white text-zinc-950 shadow-md"
              : "text-zinc-300 hover:bg-white/20 hover:text-white"
          )}
          title="Theme Customizer"
          aria-label="Open theme customizer"
        >
          <Settings2
            className={cn(
              "size-4 transition-transform duration-300",
              isOpen && "rotate-90"
            )}
          />
        </button>
      </div>
    </div>
  )
}
