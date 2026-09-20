import { useEffect, useRef, useState } from "react"

import { createFileRoute, Link } from "@tanstack/react-router"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Clock,
  Menu,
  Play,
  Search,
  Sparkles,
  Star,
  Tag,
  Volume2,
  VolumeX,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"

import {
  DEFAULT_HERO_ITEMS,
  useHeroShowcase,
} from "@/features/hero-showcase/api"
import type { HeroItem } from "@/features/hero-showcase/types"

export const Route = createFileRoute("/")({
  component: Index,
})

function renderHighlightedTitle(title: string, highlightWord?: string) {
  if (highlightWord && title.includes(highlightWord)) {
    const parts = title.split(highlightWord)
    return (
      <>
        {parts[0]}
        <span className="font-serif font-normal tracking-[-0.045em] text-white italic underline decoration-white/30 decoration-1 underline-offset-4">
          {highlightWord}
        </span>
        {parts.slice(1).join(highlightWord)}
      </>
    )
  }

  const words = title.trim().split(" ")
  if (words.length <= 2) return title
  const main = words.slice(0, -1).join(" ")
  const last = words[words.length - 1]
  return (
    <>
      {main}{" "}
      <span className="font-serif font-normal tracking-[-0.045em] text-white italic">
        {last}
      </span>
    </>
  )
}

interface CourseCarouselProps {
  items: HeroItem[]
  activeIndex: number
  onSelect: (index: number) => void
}

function CourseCarousel({ items, activeIndex, onSelect }: CourseCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])
  const rotationRef = useRef(0)
  const targetRotationRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartRotationRef = useRef(0)
  const dragDistanceRef = useRef(0)
  const [radius, setRadius] = useState(720)

  // Exactly 10 cards in the circular carousel loop
  const renderedCount = 10

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth
      if (w < 640) {
        setRadius(400)
      } else if (w < 1024) {
        setRadius(550)
      } else if (w < 1440) {
        setRadius(700)
      } else {
        setRadius(800)
      }
    }

    updateRadius()
    window.addEventListener("resize", updateRadius)
    return () => window.removeEventListener("resize", updateRadius)
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    let animationFrame = 0
    let lastFrame = performance.now()
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const stepAngle = (Math.PI * 2) / renderedCount
    // Symmetrical fade window in angular space (79 deg to 130 deg for 10-card track)
    const fadeAngle = Math.PI * 0.44
    const maxAngle = Math.PI * 0.72

    const renderCards = () => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        // Compute continuous angle offset from center in range [-Math.PI, Math.PI]
        let deltaAngle =
          (rotationRef.current +
            Math.PI +
            (index / renderedCount) * Math.PI * 2) %
          (Math.PI * 2)
        if (deltaAngle < 0) deltaAngle += Math.PI * 2
        deltaAngle -= Math.PI

        const absAngle = Math.abs(deltaAngle)

        // Fully hide cards beyond the visible front arc to prevent back-loop collisions
        if (absAngle >= maxAngle) {
          card.style.opacity = "0"
          card.style.visibility = "hidden"
          card.style.pointerEvents = "none"
          return
        }

        // Symmetrical smooth fade: as left card fades out, right card fades in identically
        let opacity = 1
        let edgeScale = 1
        if (absAngle > fadeAngle) {
          const fadeProgress = (absAngle - fadeAngle) / (maxAngle - fadeAngle)
          // Smooth cosine curve for natural edge dissolve without empty gap voids
          opacity = Math.cos(fadeProgress * (Math.PI / 2))
          edgeScale = 1 - fadeProgress * 0.12
        }

        card.style.visibility = "visible"
        card.style.pointerEvents = opacity > 0.3 ? "auto" : "none"
        card.style.opacity = `${opacity}`

        // Hybrid circular projection: maintains circular 3D feel while preserving card spacing
        const normAngle = deltaAngle / (Math.PI * 0.5)
        const x = radius * (0.42 * Math.sin(deltaAngle) + 0.58 * normAngle)

        // Authentic 3D circular cylinder depth: center is closest (z = 0), sides curve backward
        const depthRadius = radius * 0.5
        const z = -depthRadius * (1 - Math.cos(deltaAngle))
        const rotateY = -normAngle * 42
        const zIndex = Math.round(50 - Math.abs(normAngle) * 20)
        const isActive = index % items.length === activeIndex % items.length
        const scale = (isActive ? 1.05 : 1) * edgeScale

        card.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`
        card.style.zIndex = `${zIndex}`
      })
    }

    // Immediately position cards on mount / state change
    renderCards()

    const renderFrame = (now: number) => {
      const elapsed = Math.min(now - lastFrame, 50)
      lastFrame = now

      // Smoothly interpolate towards target rotation if user clicked a card or released drag
      if (targetRotationRef.current !== null) {
        const diff = targetRotationRef.current - rotationRef.current
        if (Math.abs(diff) < 0.0005) {
          rotationRef.current = targetRotationRef.current
          targetRotationRef.current = null
        } else {
          rotationRef.current += diff * 0.09
        }
      } else if (!reduceMotion && !isDraggingRef.current) {
        // Ambient drifting rotation: smooth right-to-left sliding
        rotationRef.current -= 0.00006 * elapsed
      }

      renderCards()
      animationFrame = requestAnimationFrame(renderFrame)
    }

    const onPointerDown = (event: PointerEvent) => {
      isDraggingRef.current = true
      dragStartXRef.current = event.clientX
      dragStartRotationRef.current = rotationRef.current
      dragDistanceRef.current = 0
      targetRotationRef.current = null
      viewport.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return
      const diffX = event.clientX - dragStartXRef.current
      dragDistanceRef.current = Math.max(
        dragDistanceRef.current,
        Math.abs(diffX)
      )
      // Natural 1:1 drag direction: dragging left moves cards left, dragging right moves cards right
      rotationRef.current = dragStartRotationRef.current + 0.0015 * diffX
      renderCards()
    }

    const onPointerEnd = (event: PointerEvent) => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId)
      }

      // If user dragged noticeably, snap to the nearest card at front center
      if (dragDistanceRef.current > 12) {
        const nearestIndex = Math.round(-rotationRef.current / stepAngle)
        const normalizedIndex =
          ((nearestIndex % items.length) + items.length) % items.length
        targetRotationRef.current = -nearestIndex * stepAngle
        onSelect(normalizedIndex)
      }
    }

    viewport.addEventListener("pointerdown", onPointerDown)
    viewport.addEventListener("pointermove", onPointerMove)
    viewport.addEventListener("pointerup", onPointerEnd)
    viewport.addEventListener("pointercancel", onPointerEnd)

    renderCards()
    animationFrame = requestAnimationFrame(renderFrame)

    return () => {
      cancelAnimationFrame(animationFrame)
      viewport.removeEventListener("pointerdown", onPointerDown)
      viewport.removeEventListener("pointermove", onPointerMove)
      viewport.removeEventListener("pointerup", onPointerEnd)
      viewport.removeEventListener("pointercancel", onPointerEnd)
    }
  }, [renderedCount, radius, items.length, activeIndex, onSelect])

  const handleCardClick = (index: number) => {
    // If the pointer dragged by more than 6px, treat as drag rather than click
    if (dragDistanceRef.current > 6) return

    const itemIndex = index % items.length
    onSelect(itemIndex)

    // Calculate target rotation to snap card 'index' to the front center:
    const step = (Math.PI * 2) / renderedCount
    const target = -index * step
    const current = rotationRef.current
    const normalizedDiff = Math.atan2(
      Math.sin(target - current),
      Math.cos(target - current)
    )
    targetRotationRef.current = current + normalizedDiff
  }

  return (
    <div
      ref={viewportRef}
      className="hero-collage relative mt-auto -mb-[120px] h-[520px] w-full cursor-grab touch-none select-none active:cursor-grabbing sm:-mb-[135px] sm:h-[550px]"
      aria-label="Courses and workshops showcase carousel"
    >
      <div className="absolute inset-0 -translate-y-[215px] [perspective-origin:50%_65%] [perspective:800px] [transform-style:preserve-3d] sm:-translate-y-[240px]">
        {Array.from({ length: renderedCount }, (_, index) => {
          const item = items[index % items.length]
          const isActive = index % items.length === activeIndex % items.length

          return (
            <div
              key={`${item.id}-${index}`}
              ref={(element) => {
                cardsRef.current[index] = element
              }}
              onClick={() => handleCardClick(index)}
              className={cn(
                "creator-card group pointer-events-auto absolute bottom-4 left-1/2 -ml-[125px] h-[315px] w-[250px] cursor-pointer overflow-hidden rounded-2xl shadow-2xl transition-[box-shadow,ring-color] duration-200 will-change-transform select-none [backface-visibility:hidden] sm:bottom-6 sm:-ml-[145px] sm:h-[350px] sm:w-[290px]",
                isActive
                  ? "shadow-[0_0_35px_rgba(255,255,255,0.45)] ring-2 ring-white"
                  : "hover:ring-1 hover:ring-white/40"
              )}
              aria-label={`${item.title} - ${item.badge}`}
              role="button"
              tabIndex={0}
            >
              {/* Card Thumbnail Image */}
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-500 select-none group-hover:scale-105"
              />

              {/* Floating Top Category Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-md backdrop-blur-md">
                  {item.type === "workshop" ? (
                    <span className="size-1.5 animate-pulse rounded-full bg-rose-500" />
                  ) : (
                    <Sparkles className="size-2.5 text-cyan-400" />
                  )}
                  {item.badge}
                </span>
              </div>

              {/* Active Now Pill */}
              {isActive && (
                <div className="animate-fade-in absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-extrabold tracking-wide text-[#030711] uppercase shadow-lg">
                    <Play className="size-2 fill-current" />
                    Trailer
                  </span>
                </div>
              )}

              {/* Bottom Card Overlay with Title, Instructor, and Rating */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#030711] via-[#030711]/60 to-transparent p-4 text-left">
                <div className="mb-1.5 flex items-center gap-2">
                  <img
                    src={item.instructor.avatarUrl}
                    alt={item.instructor.name}
                    className="size-5 rounded-full border border-white/30 object-cover"
                  />
                  <span className="truncate text-[11px] font-medium text-white/80">
                    {item.instructor.name}
                  </span>
                </div>

                <h3 className="line-clamp-2 text-xs leading-snug font-bold text-white">
                  {item.title}
                </h3>

                <div className="mt-2 flex items-center justify-between text-[10px] text-white/70">
                  <span className="flex items-center gap-1 font-semibold text-amber-300">
                    <Star className="size-3 fill-amber-300" />
                    {item.rating.toFixed(1)}
                  </span>
                  <span>{item.enrolledCount.toLocaleString()} enrolled</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { data: heroItems = DEFAULT_HERO_ITEMS } = useHeroShowcase()
  const activeItem = heroItems[activeIndex % heroItems.length] || heroItems[0]

  // Synchronize background trailer video with the active item
  useEffect(() => {
    const video = videoRef.current
    if (!video || !activeItem?.trailerVideoUrl) return

    if (!video.src.endsWith(activeItem.trailerVideoUrl)) {
      video.src = activeItem.trailerVideoUrl
      video.load()
      video.play().catch(() => {
        // Browsers block autoplay with audio without prior gesture; fallback to muted
        video.muted = true
        setIsMuted(true)
        video.play().catch(() => {})
      })
    }
  }, [activeItem?.trailerVideoUrl])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = false
    video.play().catch(() => {
      video.muted = true
      setIsMuted(true)
      video.play().catch(() => {})
    })
  }, [])

  const toggleAudio = () => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !isMuted
    video.muted = nextMuted
    setIsMuted(nextMuted)
    if (!nextMuted) {
      video.play().catch(() => {})
    }
  }

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [menuOpen])

  return (
    <main className="min-h-svh bg-[#030711] pt-[68px] text-[#f2f3f7] transition-colors duration-500 sm:pt-[72px]">
      <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/[0.08] bg-[#030711]/55 text-white shadow-[0_10px_35px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300">
        {/* Subtle top edge specular reflection */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between px-5 py-3 sm:px-8 sm:py-3.5 lg:px-12">
          {/* Left section: Logo + Left-aligned navigation */}
          <div className="flex items-center gap-6 lg:gap-10">
            <Link
              to="/"
              className="flex items-center transition-opacity hover:opacity-90"
              aria-label="NepaliMentor home"
            >
              <img
                src="/logo.png"
                alt="NepaliMentor"
                className="h-8 w-auto object-contain transition-transform duration-200 hover:scale-[1.02] sm:h-9"
              />
            </Link>

            <nav
              className="hidden items-center gap-1 md:flex lg:gap-2"
              aria-label="Main navigation"
            >
              {[
                ["Courses", "#courses"],
                ["Workshop", "#workshop"],
                ["Marketplace", "#marketplace"],
                ["Contact Us", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="group relative overflow-hidden rounded-full px-3.5 py-1.5 text-sm font-semibold tracking-tight text-white/80 transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.12)] active:scale-95"
                >
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10 inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
                    {label}
                  </span>
                  <span className="pointer-events-none absolute inset-x-2 bottom-0.5 h-[2px] scale-x-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <label className="hidden h-9 w-64 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-3.5 transition-all duration-300 focus-within:w-72 focus-within:border-white/25 xl:flex">
              <Search className="size-3.5 shrink-0 opacity-45" />
              <span className="sr-only">Search courses</span>
              <input
                type="search"
                placeholder="Search courses..."
                className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/40"
              />
            </label>

            {/* White Register Button */}
            <Link
              to="/sign-up"
              className="group flex h-9 items-center gap-2 rounded-full bg-white px-4 text-xs font-bold text-[#080b11] shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-white/90 active:scale-95 sm:px-5"
            >
              <span>Register</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            {/* Navbar Menu Icon Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/15 active:scale-95"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="offcanvas-menu"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 cursor-default bg-black/55 backdrop-blur-[3px]"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            />
            <aside
              id="offcanvas-menu"
              className="fixed top-0 right-0 z-50 flex h-svh w-[min(420px,92vw)] animate-in flex-col border-l border-white/10 bg-[#030711] p-6 text-white shadow-2xl duration-300 slide-in-from-right sm:p-8"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center transition-opacity hover:opacity-90"
                  aria-label="NepaliMentor home"
                >
                  <img
                    src="/logo.png"
                    alt="NepaliMentor"
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 transition-colors hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="size-4" />
                </button>
              </div>

              <label className="mt-10 flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 focus-within:border-white/25">
                <Search className="size-4 text-white/45" />
                <span className="sr-only">Search courses</span>
                <input
                  type="search"
                  placeholder="Search courses and workshops"
                  className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/35"
                />
              </label>

              <nav className="mt-10 flex flex-col" aria-label="Menu navigation">
                {[
                  ["Courses", "#courses"],
                  ["Workshop", "#workshop"],
                  ["Marketplace", "#marketplace"],
                  ["Contact Us", "#contact"],
                ].map(([label, href], index) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between border-b border-white/10 py-5 text-xl font-medium tracking-[-0.025em] transition-colors hover:text-white/65"
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-[10px] text-white/30">
                        0{index + 1}
                      </span>
                      {label}
                    </span>
                    <ArrowUpRight className="size-4 opacity-35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </nav>

              <div className="mt-auto rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                <p className="text-sm font-semibold">
                  Ready to start learning?
                </p>
                <p className="mt-1 text-xs leading-5 text-white/45">
                  Create your free account and build your first learning path.
                </p>
                <Link
                  to="/sign-up"
                  onClick={() => setMenuOpen(false)}
                  className="mt-5 flex h-11 items-center justify-between rounded-full bg-white px-5 text-xs font-semibold text-[#080b11]"
                >
                  Register free
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </aside>
          </>
        )}
      </header>

      <section className="relative mx-auto flex min-h-[calc(100svh-72px)] w-full max-w-[1666px] flex-col overflow-hidden">
        {/* Background Video with subtle cinematic overlay and bottom fade */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            onError={(e) => {
              // Fallback if remote trailer URL fails or expires
              const target = e.currentTarget
              if (!target.src.includes("/videos/bheda-ko-oon.mp4")) {
                target.src = "/videos/bheda-ko-oon.mp4"
                target.load()
                target.play().catch(() => {})
              }
            }}
            className="h-full w-full object-cover transition-opacity duration-700"
          >
            <source
              src={activeItem?.trailerVideoUrl || "/videos/bheda-ko-oon.mp4"}
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/45" />

          {/* Readability gradient fade behind text area */}
          <div
            className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-[#030711]/90 via-[#030711]/60 to-transparent"
            aria-hidden="true"
          />

          {/* Bottom gradient fade on video ONLY (stays strictly behind the cards slider) */}
          <div
            className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#030711] via-[#030711]/85 to-transparent sm:h-80 lg:h-96"
            aria-hidden="true"
          />
        </div>

        {/* Audio Mute/Unmute Control */}
        <button
          type="button"
          onClick={toggleAudio}
          className="absolute right-6 bottom-6 z-30 flex items-center gap-2 rounded-full border border-white/15 bg-[#030711]/80 px-3.5 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-[#030711] active:scale-95 sm:right-8 sm:bottom-8"
          aria-label={
            isMuted ? "Unmute background audio" : "Mute background audio"
          }
        >
          {isMuted ? (
            <>
              <VolumeX className="size-4 opacity-70" />
              <span className="text-[11px] font-semibold">Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="size-4 animate-pulse text-emerald-500" />
              <span className="text-[11px] font-semibold">Mute</span>
            </>
          )}
        </button>

        {/* Dynamic Center Hero Information */}
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 pt-3 text-center sm:pt-5 lg:pt-6">
          {/* Top Rating & Enrollment Badge */}
          <div className="hero-reveal flex items-center gap-3 transition-all duration-300">
            <div className="flex -space-x-2.5">
              {(activeItem.avatars || []).slice(0, 4).map((src, index) => (
                <img
                  key={`${activeItem.id}-av-${index}`}
                  src={src}
                  alt={`Student ${index + 1}`}
                  className="size-8 rounded-full border-2 border-[#030711] object-cover shadow-md transition-transform duration-200 hover:z-10 hover:scale-110 sm:size-9"
                />
              ))}
            </div>
            <div className="text-left text-[11px] leading-tight sm:text-xs">
              <div className="flex items-center gap-1 font-bold text-white">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                {activeItem.rating.toFixed(1)}/5 Rating
              </div>
              <p className="mt-0.5 text-black/60 dark:text-white/70">
                {activeItem.enrolledCount.toLocaleString()}+ learners enrolled
              </p>
            </div>
          </div>

          {/* Dynamic Headline: Strictly 1 line with locked height so button never shifts */}
          <div className="mt-2 flex h-[1.25em] max-w-[850px] items-center justify-center text-[clamp(1.85rem,3.4vw,2.95rem)] leading-[1.15] font-medium tracking-[-0.04em] drop-shadow-sm sm:mt-2.5 dark:drop-shadow-[0_2px_18px_rgba(0,0,0,0.8)]">
            <h1
              key={activeItem.id}
              className="hero-reveal truncate text-center"
            >
              {renderHighlightedTitle(
                activeItem.title,
                activeItem.highlightWord
              )}
            </h1>
          </div>

          {/* Course Meta: Mentor Name, Price, Total Lessons, Duration - above description */}
          <div
            key={`${activeItem.id}-meta`}
            className="hero-reveal mt-3 flex flex-wrap items-center justify-center gap-2 text-xs transition-all duration-300 sm:gap-2.5"
          >
            {/* Mentor */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] py-1 pr-3 pl-1.5 text-white shadow-sm backdrop-blur-md">
              <img
                src={
                  activeItem.instructor?.avatarUrl || "/creators/team-01.webp"
                }
                alt={activeItem.instructor?.name || "Nepali Mentor"}
                className="size-4.5 rounded-full border border-white/30 object-cover"
              />
              <span className="text-[11px] font-semibold sm:text-xs">
                {activeItem.instructor?.name || "Nepali Mentor"}
              </span>
            </div>

            {/* Course Price */}
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-bold text-emerald-300 shadow-sm backdrop-blur-md sm:text-xs">
              <Tag className="size-3 text-emerald-400" />
              <span>{activeItem.price || "Rs. 2,999"}</span>
            </div>

            {/* Total Lessons */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-[11px] font-medium text-white/90 shadow-sm backdrop-blur-md sm:text-xs">
              <BookOpen className="size-3 text-cyan-400" />
              <span>
                {activeItem.totalLessons ||
                  (activeItem.type === "workshop" ? "8 Modules" : "24 Lessons")}
              </span>
            </div>

            {/* Course Duration */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-[11px] font-medium text-white/90 shadow-sm backdrop-blur-md sm:text-xs">
              <Clock className="size-3 text-amber-400" />
              <span>
                {activeItem.duration ||
                  (activeItem.type === "workshop" ? "6.0 Hours" : "14.5 Hours")}
              </span>
            </div>
          </div>

          {/* Dynamic Synopsis: Strictly 2 lines with locked height so button never shifts */}
          <div className="mt-2.5 flex h-[2.85em] max-w-lg items-center justify-center text-xs leading-[1.42] text-black/75 drop-shadow-sm sm:text-sm sm:leading-[1.42] dark:text-white/80">
            <p
              key={`${activeItem.id}-desc`}
              className="hero-reveal line-clamp-2 text-center"
            >
              {activeItem.description}
            </p>
          </div>

          {/* Dynamic Interactive CTA Button: Stationary position, never moves or jumps */}
          <div className="hero-reveal mt-4 inline-block sm:mt-4.5">
            <Link
              to={activeItem.enrollUrl || "/sign-up"}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px] font-semibold shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(192,132,252,0.6)] active:scale-95"
            >
              {/* Continuously Rotating Conic Gradient Border Beam */}
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#38bdf8_0%,#c084fc_25%,#f43f5e_50%,#38bdf8_75%,#c084fc_100%)] opacity-95 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Inner Button Surface - fixed min-width for stationary centering */}
              <span className="relative inline-flex h-11 min-w-[215px] items-center justify-center gap-3 rounded-full bg-[#080b11]/92 px-6 text-[11px] font-semibold text-white backdrop-blur-2xl transition-colors duration-300 group-hover:bg-[#080b11]/80 sm:h-11.5 sm:min-w-[235px] sm:px-7 sm:text-xs">
                {/* Surface Shimmer Reflection */}
                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 -translate-x-full animate-[shimmer-sweep_3.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </span>

                <span className="relative z-10 tracking-tight">
                  {activeItem.type === "workshop"
                    ? "Join Live Workshop"
                    : "Explore Course & Enroll"}
                </span>

                <span className="relative z-10 flex size-6 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black">
                  <ArrowRight className="size-3" />
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* Interactive 3D Showcase Carousel */}
        <CourseCarousel
          items={heroItems}
          activeIndex={activeIndex}
          onSelect={(index) => setActiveIndex(index)}
        />

        {/* Animated "Browse more" button */}
        <Link
          to="/sign-up"
          className="group absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 rounded-full border border-white/20 bg-black/45 px-5 py-1.5 text-center text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-black/65 hover:shadow-2xl active:scale-95 sm:bottom-4 sm:px-6 sm:py-2 dark:border-white/15 dark:bg-[#030711]/75 dark:hover:bg-[#030711]/90"
          aria-label="Browse more"
        >
          <span className="text-[11px] font-bold tracking-wider text-white/90 transition-colors group-hover:text-white sm:text-xs">
            Browse more
          </span>
          <div className="flex items-center gap-1 text-white/70 transition-colors group-hover:text-white">
            <ChevronDown className="size-3 animate-bounce [animation-delay:0ms] [animation-duration:1.2s] sm:size-3.5" />
            <ChevronDown className="size-3 animate-bounce [animation-delay:150ms] [animation-duration:1.2s] sm:size-3.5" />
            <ChevronDown className="size-3 animate-bounce [animation-delay:300ms] [animation-duration:1.2s] sm:size-3.5" />
          </div>
        </Link>
      </section>
    </main>
  )
}
