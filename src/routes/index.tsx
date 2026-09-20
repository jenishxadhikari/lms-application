import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type UIEvent,
} from "react"

import { useAuth } from "@/auth"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock,
  Menu,
  Play,
  Search,
  Sparkles,
  Star,
  Tag,
  Users,
  Volume2,
  VolumeX,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { useIsMobile } from "@/hooks/use-mobile"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { FullscreenButton } from "@/components/fullscreen-button"
import { ModeToggle } from "@/components/mode-toggle"
import { HomeSidebar } from "@/components/sidebar/home-sidebar"
import { UserDropdown } from "@/components/user-dropdown"

import {
  DEFAULT_HERO_ITEMS,
  useHeroShowcase,
} from "@/features/hero-showcase/api"
import type { HeroItem } from "@/features/hero-showcase/types"

const HOMEPAGE_NAV_ITEMS = [
  {
    title: "Courses",
    url: "#courses",
  },
  {
    title: "Workshop",
    url: "#workshop",
  },
  {
    title: "Mentorship",
    url: "#mentorship",
    badge: "1-on-1",
  },
  {
    title: "Marketplace",
    url: "#marketplace",
  },
  {
    title: "Blog",
    url: "#blog",
  },
  {
    title: "Contact Us",
    url: "#contact",
  },
]

function HomeNavbarLinks() {
  const { open, openMobile } = useSidebar()

  if (open || openMobile) {
    return null
  }

  return (
    <>
      <Separator
        orientation="vertical"
        className="mr-1 hidden h-5 min-[1700px]:block"
      />
      <nav
        className="hidden items-center gap-1 min-[1700px]:flex"
        aria-label="Main navigation"
      >
        {HOMEPAGE_NAV_ITEMS.map((item) => (
          <a
            key={item.title}
            href={item.url}
            className="homepage-navbar-link inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold text-foreground/85"
          >
            <span>{item.title}</span>
            {item.badge && (
              <span className="rounded-full border border-white/20 bg-black px-1.5 py-0.5 text-[10px] font-bold text-white uppercase">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>
    </>
  )
}

const SEARCH_PROMPTS = [
  "Search courses...",
  "Search workshops...",
  "Search mentorship...",
  "Search marketplace...",
]

function AnimatedNavbarSearch() {
  const [promptIndex, setPromptIndex] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const prompt = SEARCH_PROMPTS[promptIndex]

  useEffect(() => {
    let delay = isDeleting ? 45 : 80

    if (!isDeleting && characterCount === prompt.length) {
      delay = 1400
    } else if (isDeleting && characterCount === 0) {
      delay = 300
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting && characterCount === prompt.length) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && characterCount === 0) {
        setIsDeleting(false)
        setPromptIndex((current) => (current + 1) % SEARCH_PROMPTS.length)
        return
      }

      setCharacterCount((current) => current + (isDeleting ? -1 : 1))
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [characterCount, isDeleting, prompt])

  return (
    <label className="group hidden h-9.5 w-56 items-center gap-2.5 rounded-lg border border-black/40 bg-white/90 px-3.5 text-sm text-zinc-950 shadow-xs transition-[width,background-color,border-color,box-shadow,transform] duration-300 ease-out focus-within:w-72 focus-within:border-black/80 focus-within:bg-white focus-within:shadow-[0_8px_22px_rgba(0,0,0,0.16)] focus-within:ring-2 focus-within:ring-black/15 hover:-translate-y-0.5 hover:border-black/70 hover:bg-white hover:shadow-[0_7px_18px_rgba(0,0,0,0.14)] lg:flex xl:w-72 xl:focus-within:w-80 2xl:w-80 2xl:focus-within:w-96 dark:border-white/20 dark:bg-white/5 dark:text-white dark:focus-within:border-white/40 dark:focus-within:bg-white/10 dark:focus-within:shadow-[0_8px_24px_rgba(0,0,0,0.4)] dark:focus-within:ring-white/15 dark:hover:border-white/35 dark:hover:bg-white/10 dark:hover:shadow-[0_7px_20px_rgba(0,0,0,0.35)]">
      <Search className="size-4 shrink-0 text-black opacity-80 transition-[color,opacity,transform] duration-300 group-focus-within:scale-110 group-focus-within:opacity-100 group-hover:scale-110 group-hover:rotate-[-6deg] group-hover:opacity-100 dark:text-white dark:opacity-70" />
      <span className="sr-only">Search courses</span>
      <input
        type="search"
        aria-label="Search courses, workshops, mentorship, and marketplace"
        placeholder={prompt.slice(0, characterCount)}
        className="w-full bg-transparent text-sm text-black outline-none placeholder:text-sm placeholder:font-medium placeholder:text-black/75 placeholder:transition-colors group-focus-within:placeholder:text-black group-hover:placeholder:text-black dark:text-white dark:placeholder:text-white/70 dark:group-focus-within:placeholder:text-white dark:group-hover:placeholder:text-white"
      />
    </label>
  )
}

export const Route = createFileRoute("/")({
  component: Index,
})

function renderHighlightedTitle(title: string, highlightWord?: string) {
  const words = title.trim().split(/\s+/)
  return (
    <span className="text-white">
      {words.map((word, index) => {
        const isHighlighted = highlightWord === word
        const isLastWord = index === words.length - 1

        return (
          <Fragment key={`${word}-${index}`}>
            {index > 0 && " "}
            <span className="hero-title-word">
              <span
                className={cn(
                  (isHighlighted || isLastWord) &&
                    "font-serif font-normal tracking-[-0.045em] italic",
                  isHighlighted &&
                    "underline decoration-white/30 decoration-1 underline-offset-4"
                )}
              >
                {word}
              </span>
            </span>
          </Fragment>
        )
      })}
    </span>
  )
}

interface CourseCarouselProps {
  items: HeroItem[]
  activeIndex: number
  onSelect: (index: number) => void
}

function MobileCourseSlider({
  items,
  activeIndex,
  onSelect,
}: CourseCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollTimerRef = useRef<number | null>(null)
  const isInteractingRef = useRef(false)

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (
      items.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const interval = window.setInterval(() => {
      if (isInteractingRef.current) return

      const nextIndex = (activeIndex + 1) % items.length
      onSelect(nextIndex)
      const nextCard = trackRef.current?.children[nextIndex] as
        HTMLElement | undefined

      nextCard?.scrollIntoView({
        behavior: nextIndex === 0 ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      })
    }, 4500)

    return () => window.clearInterval(interval)
  }, [activeIndex, items.length, onSelect])

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget

    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current)
    }

    scrollTimerRef.current = window.setTimeout(() => {
      const trackCenter = track.scrollLeft + track.clientWidth / 2
      const cards = Array.from(track.children) as HTMLElement[]
      let nearestIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(cardCenter - trackCenter)

        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = index
        }
      })

      if (nearestIndex !== activeIndex) {
        onSelect(nearestIndex)
      }
    }, 100)
  }

  const selectAndCenterCard = (index: number) => {
    onSelect(index)
    const card = trackRef.current?.children[index] as HTMLElement | undefined
    card?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    })
  }

  return (
    <div className="relative mt-[clamp(1.5rem,4svh,3rem)] w-full pb-[clamp(1rem,3svh,2.5rem)] lg:hidden">
      <div
        ref={trackRef}
        className="mobile-course-track flex snap-x snap-mandatory gap-3 overflow-x-auto px-[12vw] pt-1.5 pb-3 md:px-[calc(50vw-145px)]"
        onScroll={handleScroll}
        onPointerDown={() => {
          isInteractingRef.current = true
        }}
        onPointerUp={() => {
          isInteractingRef.current = false
        }}
        onPointerCancel={() => {
          isInteractingRef.current = false
        }}
        aria-label="Swipe through courses and workshops"
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex % items.length

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectAndCenterCard(index)}
              className={cn(
                "course-card-swipe group relative h-[min(285px,38svh)] w-[min(76vw,270px)] shrink-0 snap-center overflow-hidden rounded-2xl border-2 text-left transition-[border-color,opacity,transform,box-shadow] duration-300 md:h-[340px] md:w-[290px]",
                isActive
                  ? "scale-100 border-white opacity-100 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_16px_38px_rgba(0,0,0,0.5)]"
                  : "scale-[0.94] border-white/20 opacity-55 shadow-[0_10px_24px_rgba(0,0,0,0.32)]"
              )}
              aria-label={`${item.title} - ${item.badge}`}
              aria-current={isActive ? "true" : undefined}
            >
              <img
                src={item.thumbnailUrl}
                alt=""
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-500 group-active:scale-105"
              />

              <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/65 px-2 py-1 text-[9px] font-bold tracking-wider text-white uppercase shadow-md backdrop-blur-md">
                {item.type === "workshop" ? (
                  <span className="size-1.5 rounded-full bg-white/80" />
                ) : (
                  <Sparkles className="size-2.5" />
                )}
                {item.badge}
              </span>

              {isActive && (
                <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[9px] font-extrabold tracking-wide text-black uppercase shadow-lg">
                  <Play className="size-2 fill-current" />
                  Active
                </span>
              )}

              <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white">
                <span className="mb-2 flex items-center gap-2">
                  <img
                    src={item.instructor.avatarUrl}
                    alt=""
                    className="size-6 rounded-full border border-white/40 object-cover"
                  />
                  <span className="truncate text-xs font-semibold text-white/85">
                    {item.instructor.name}
                  </span>
                </span>
                <span className="text-base leading-snug font-bold text-white">
                  {item.title.trim().split(/\s+/).slice(0, 8).join(" ")}
                </span>
                <span className="mt-3 flex items-center justify-between text-[11px] text-white/75">
                  <span className="flex items-center gap-1 font-semibold text-white">
                    <Star className="size-3.5 fill-current" />
                    {item.rating.toFixed(1)}
                  </span>
                  <span>{item.enrolledCount.toLocaleString()} enrolled</span>
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-1 flex items-center justify-center gap-1.5">
        {items.map((item, index) => (
          <button
            key={`${item.id}-dot`}
            type="button"
            onClick={() => selectAndCenterCard(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === activeIndex % items.length
                ? "w-5 bg-white"
                : "w-1.5 bg-white/35"
            )}
            aria-label={`Show ${item.title}`}
          />
        ))}
      </div>
    </div>
  )
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
      if (w < 480) {
        setRadius(285)
      } else if (w < 640) {
        setRadius(360)
      } else if (w < 1024) {
        setRadius(520)
      } else if (w < 1440) {
        setRadius(650)
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

        // Dynamic center magnification: smoothly expands width as card nears center and tapers off as it moves away
        const centerZone = stepAngle * 1.35
        const centerFactor =
          absAngle < centerZone
            ? 0.5 * (1 + Math.cos((absAngle / centerZone) * Math.PI))
            : 0

        // Subtly expand card width near center (+12% width, +3% height)
        const centerWidthBoost = 1 + 0.12 * centerFactor
        const centerHeightBoost = 1 + 0.03 * centerFactor

        const normAngle = deltaAngle / (Math.PI * 0.5)
        const x = radius * (0.42 * Math.sin(deltaAngle) + 0.58 * normAngle)

        // Authentic 3D circular cylinder depth: center is closest (z = 0), sides curve backward
        const depthRadius = radius * 0.5
        const z = -depthRadius * (1 - Math.cos(deltaAngle))
        const rotateY = -normAngle * 42
        const zIndex = Math.round(50 - Math.abs(normAngle) * 20)
        const isActive = index % items.length === activeIndex % items.length
        const scaleX = (isActive ? 1.02 : 1) * edgeScale * centerWidthBoost
        const scaleY = (isActive ? 1.02 : 1) * edgeScale * centerHeightBoost

        card.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scaleX}, ${scaleY})`
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
      className="hero-collage relative mt-auto hidden h-[500px] w-full cursor-grab touch-none select-none active:cursor-grabbing lg:-mb-[135px] lg:block lg:-translate-y-[88px]"
      aria-label="Courses and workshops showcase carousel"
    >
      <div className="absolute inset-0 -translate-y-[135px] [perspective-origin:50%_65%] [perspective:800px] [transform-style:preserve-3d] sm:-translate-y-[190px] lg:-translate-y-[80px]">
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
                "creator-card course-card-swipe group pointer-events-auto absolute bottom-4 left-1/2 -ml-[105px] h-[270px] w-[210px] cursor-pointer overflow-hidden rounded-xl shadow-2xl transition-[box-shadow,ring-color] duration-200 will-change-transform select-none [backface-visibility:hidden] sm:bottom-5 sm:-ml-[125px] sm:h-[315px] sm:w-[250px] sm:rounded-2xl lg:bottom-6 lg:-ml-[145px] lg:h-[350px] lg:w-[290px]",
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
              <div className="absolute top-2.5 left-2.5 z-10 sm:top-3 sm:left-3">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/60 px-2 py-1 text-[9px] font-bold tracking-wider text-white uppercase shadow-md backdrop-blur-md sm:gap-1.5 sm:px-2.5 sm:text-[10px]">
                  {item.type === "workshop" ? (
                    <span className="size-1.5 animate-pulse rounded-full bg-white/70" />
                  ) : (
                    <Sparkles className="size-2.5 text-current" />
                  )}
                  {item.badge}
                </span>
              </div>

              {/* Active Now Pill */}
              {isActive && (
                <div className="animate-fade-in absolute top-2.5 right-2.5 z-10 sm:top-3 sm:right-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-extrabold tracking-wide text-black uppercase shadow-lg">
                    <Play className="size-2 fill-current" />
                    Trailer
                  </span>
                </div>
              )}

              {/* Bottom Card Overlay with Title, Instructor, and Rating */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#030711] via-[#030711]/60 to-transparent p-3 text-left sm:p-4">
                <div className="mb-1.5 flex items-center gap-2">
                  <img
                    src={item.instructor.avatarUrl}
                    alt={item.instructor.name}
                    className="size-5 rounded-full border border-white/30 object-cover"
                  />
                  <span className="course-card-text truncate text-[11px] font-medium text-white/80">
                    {item.instructor.name}
                  </span>
                </div>

                <h3
                  className="course-card-title text-sm leading-snug font-bold text-white"
                  title={item.title}
                >
                  {item.title.trim().split(/\s+/).slice(0, 8).join(" ")}
                </h3>

                <div className="mt-2 flex items-center justify-between text-[10px] text-white/70">
                  <span className="course-card-text flex items-center gap-1 font-semibold text-white/80">
                    <Star className="size-3 fill-current" />
                    {item.rating.toFixed(1)}
                  </span>
                  <span className="course-card-text">
                    {item.enrolledCount.toLocaleString()} enrolled
                  </span>
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
  const { isAuthenticated } = useAuth()
  const isMobileViewport = useIsMobile()
  const usesCompactCarousel = useIsMobile(1024)
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { data: heroItems = DEFAULT_HERO_ITEMS } = useHeroShowcase()
  const activeItem = heroItems[activeIndex % heroItems.length] || heroItems[0]
  const displayedHeroTitle = activeItem.title
    .trim()
    .split(/\s+/)
    .slice(0, 8)
    .join(" ")
  const heroTitleWords = displayedHeroTitle.split(/\s+/)
  const heroTitleBreak = Math.ceil(heroTitleWords.length / 2)
  const mobileHeroTitleFirstLine = heroTitleWords
    .slice(0, heroTitleBreak)
    .join(" ")
  const mobileHeroTitleSecondLine = heroTitleWords
    .slice(heroTitleBreak)
    .join(" ")

  // Synchronize background trailer video with the active item
  useEffect(() => {
    const video = videoRef.current
    if (isMobileViewport || !video || !activeItem?.trailerVideoUrl) return

    // Set both properties before assigning/loading a source so the browser can
    // never begin autoplay with sound during the initial media load.
    video.defaultMuted = isMuted
    video.muted = isMuted

    if (!video.src.endsWith(activeItem.trailerVideoUrl)) {
      video.src = activeItem.trailerVideoUrl
      video.load()
    }

    video.play().catch(() => {
      video.muted = true
      video.defaultMuted = true
      setIsMuted(true)
      video.play().catch(() => {})
    })
  }, [activeItem?.trailerVideoUrl, isMobileViewport, isMuted])

  const toggleAudio = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !isMuted
    video.muted = nextMuted
    video.defaultMuted = nextMuted
    setIsMuted(nextMuted)
    if (!nextMuted) {
      video.play().catch(() => {})
    }
  }, [isMuted])

  useEffect(() => {
    const handleMuteShortcut = (event: KeyboardEvent) => {
      const target = event.target
      const isTextEntry =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)

      if (
        isTextEntry ||
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.key.toLowerCase() !== "m"
      ) {
        return
      }

      event.preventDefault()
      toggleAudio()
    }

    window.addEventListener("keydown", handleMuteShortcut)
    return () => window.removeEventListener("keydown", handleMuteShortcut)
  }, [toggleAudio])

  return (
    <SidebarProvider defaultOpen={false}>
      <HomeSidebar />
      <SidebarInset className="!m-0 min-h-svh min-w-0">
        {isAnnouncementVisible && (
          <aside
            className="relative flex min-h-9 shrink-0 items-center justify-center border-b border-blue-200/80 bg-blue-50 px-9 py-1 text-center text-[clamp(0.5rem,2.65vw,0.6875rem)] leading-none font-semibold whitespace-nowrap text-blue-600 sm:px-11 sm:text-sm sm:leading-snug dark:border-blue-900/60 dark:bg-blue-950/70 dark:text-blue-300"
            aria-label="Announcement"
          >
            <p>New learning updates and announcements will appear here.</p>
            <button
              type="button"
              onClick={() => setIsAnnouncementVisible(false)}
              className="absolute right-1.5 inline-flex size-7 items-center justify-center rounded-md text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:right-4 dark:text-blue-300 dark:hover:bg-blue-900/70 dark:hover:text-blue-100 dark:focus-visible:ring-offset-blue-950"
              aria-label="Dismiss announcement"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </aside>
        )}
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-1.5 border-b border-border bg-background px-2 text-foreground transition-[width,height] ease-linear sm:h-16 sm:gap-3 sm:px-4 lg:px-5">
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
            <SidebarTrigger className="size-8 shrink-0 sm:-ml-1 sm:size-9">
              <Menu className="size-5" />
            </SidebarTrigger>

            <Link
              to="/"
              className="flex min-w-0 items-center gap-2 transition-opacity hover:opacity-90"
              aria-label="NepaliMentor home"
            >
              <img
                src="/logo-light.png"
                alt="NepaliMentor"
                className="h-7 w-auto max-w-[112px] object-contain transition-transform duration-200 hover:scale-[1.02] sm:h-9 sm:max-w-[150px] dark:hidden"
              />
              <img
                src="/logo.png"
                alt="NepaliMentor"
                className="hidden h-7 w-auto max-w-[112px] object-contain transition-transform duration-200 hover:scale-[1.02] sm:h-9 sm:max-w-[150px] dark:block"
              />
            </Link>

            <HomeNavbarLinks />
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <AnimatedNavbarSearch />

            <ModeToggle />
            <div className="hidden sm:block">
              <FullscreenButton />
            </div>

            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/sign-in"
                  className="hidden h-9 items-center justify-center rounded-md px-3 text-sm font-semibold text-foreground/85 transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
                >
                  Sign in
                </Link>
                <Link
                  to="/sign-up"
                  className="inline-flex h-8 items-center justify-center gap-1 rounded-md bg-primary px-2.5 text-xs font-bold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 active:scale-95 sm:h-9 sm:gap-1.5 sm:px-4 sm:text-sm"
                >
                  <span>Sign up</span>
                  <ArrowRight className="hidden size-3.5 sm:block" />
                </Link>
              </div>
            )}
          </div>
        </header>
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-clip overflow-y-visible">
          <section className="relative flex min-h-0 w-full max-w-none flex-col overflow-x-clip overflow-y-visible bg-background lg:h-[calc(100svh_-_15rem)] lg:max-h-[850px] lg:min-h-[720px] lg:flex-none lg:border-b lg:border-white/15">
            {isMobileViewport ? (
              <div
                className="mobile-hero-background pointer-events-none absolute inset-0 z-0 overflow-hidden"
                aria-hidden="true"
              />
            ) : (
              /* Background video remains exclusive to tablet and desktop. */
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  onLoadStart={(event) => {
                    if (isMuted) {
                      event.currentTarget.defaultMuted = true
                      event.currentTarget.muted = true
                    }
                  }}
                  onCanPlay={(event) => {
                    if (isMuted) {
                      event.currentTarget.defaultMuted = true
                      event.currentTarget.muted = true
                    }
                  }}
                  onError={(e) => {
                    const target = e.currentTarget
                    if (!target.src.includes("/videos/bheda-ko-oon.mp4")) {
                      target.defaultMuted = true
                      target.muted = true
                      setIsMuted(true)
                      target.src = "/videos/bheda-ko-oon.mp4"
                      target.load()
                      target.play().catch(() => {})
                    }
                  }}
                  className="h-full w-full object-cover opacity-65 transition-opacity duration-700 dark:opacity-100"
                >
                  <source
                    src={
                      activeItem?.trailerVideoUrl || "/videos/bheda-ko-oon.mp4"
                    }
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-black/40" />
                <div
                  className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-black/75 via-black/35 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/85 via-black/50 to-transparent sm:h-80 lg:h-96"
                  aria-hidden="true"
                />
              </div>
            )}

            {/* Audio Mute/Unmute Control */}
            <button
              type="button"
              onClick={toggleAudio}
              className="absolute right-5 bottom-5 z-30 hidden items-center justify-center gap-2 rounded-full border border-black/10 bg-white/90 px-3.5 py-2 text-xs font-medium text-zinc-900 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-black/20 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.24)] focus-visible:ring-2 focus-visible:ring-black/30 active:scale-95 md:flex lg:right-8 lg:bottom-8 dark:border-white/20 dark:bg-black/75 dark:text-white dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] dark:hover:border-white/35 dark:hover:bg-black/90 dark:focus-visible:ring-white/40"
              aria-label={
                isMuted ? "Unmute background audio" : "Mute background audio"
              }
            >
              {isMuted ? (
                <>
                  <VolumeX className="size-4 text-zinc-600 dark:text-zinc-300" />
                  <span className="text-[11px] font-semibold text-zinc-900 dark:text-white">
                    Unmute
                  </span>
                </>
              ) : (
                <>
                  <Volume2 className="size-4 animate-pulse text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[11px] font-semibold text-zinc-900 dark:text-white">
                    Mute
                  </span>
                </>
              )}
            </button>

            {/* Dynamic Center Hero Information */}
            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-3 pt-2 text-center sm:px-5 sm:pt-4 lg:px-6 lg:pt-12">
              {/* Top Rating & Enrollment Badge */}
              <div className="hero-reveal hidden items-center gap-3 transition-all duration-300 sm:flex lg:hidden">
                <div className="flex -space-x-2.5">
                  {(activeItem.avatars || []).slice(0, 4).map((src, index) => (
                    <img
                      key={`${activeItem.id}-av-${index}`}
                      src={src}
                      alt={`Student ${index + 1}`}
                      className="size-7 rounded-full border-2 border-background object-cover shadow-md transition-transform duration-200 hover:z-10 hover:scale-110 sm:size-9"
                    />
                  ))}
                </div>
                <div className="text-left text-[11px] leading-tight sm:text-xs">
                  <div className="flex items-center gap-1 font-bold text-white">
                    <Star className="size-3.5 fill-white text-white" />
                    <span className="text-white">
                      {activeItem.rating.toFixed(1)}/5 Rating
                    </span>
                  </div>
                  <p className="mt-0.5 text-white/75">
                    {activeItem.enrolledCount.toLocaleString()}+ learners
                    enrolled
                  </p>
                </div>
              </div>

              {/* Two balanced lines on mobile; a single line on larger screens. */}
              <div className="mt-1.5 flex h-[2.15em] w-full max-w-[1000px] items-center justify-center overflow-hidden text-[clamp(1.5rem,6.8vw,2.4rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.8)] sm:mt-2.5 sm:h-[1.25em] sm:text-[clamp(1.75rem,4.5vw,2.75rem)] sm:leading-[1.12] sm:font-medium lg:text-[clamp(2rem,3.25vw,3.15rem)]">
                <h1
                  key={activeItem.id}
                  className="hero-course-title w-full text-center text-white"
                  title={displayedHeroTitle}
                >
                  <span className="flex flex-col items-center sm:hidden">
                    <span className="block whitespace-nowrap">
                      {renderHighlightedTitle(
                        mobileHeroTitleFirstLine,
                        activeItem.highlightWord
                      )}
                    </span>
                    {mobileHeroTitleSecondLine && (
                      <span className="mt-0.5 block text-[0.8em] tracking-[-0.025em] whitespace-nowrap text-white/95">
                        {renderHighlightedTitle(
                          mobileHeroTitleSecondLine,
                          activeItem.highlightWord
                        )}
                      </span>
                    )}
                  </span>
                  <span className="hidden truncate whitespace-nowrap sm:block">
                    {renderHighlightedTitle(
                      displayedHeroTitle,
                      activeItem.highlightWord
                    )}
                  </span>
                </h1>
              </div>

              {/* Course Meta: Mentor Name, Price, Total Lessons, Duration - above description */}
              <div
                key={`${activeItem.id}-meta`}
                className="hero-reveal mt-2 flex max-w-xl flex-wrap items-center justify-center gap-1 text-[9px] transition-all duration-300 sm:mt-3 sm:gap-2 sm:text-xs lg:gap-2.5"
              >
                {/* Mentor */}
                <div className="hero-swipe flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.08] py-0.5 pr-1.5 pl-1 text-white shadow-sm backdrop-blur-md sm:gap-1.5 sm:py-1 sm:pr-3 sm:pl-1.5">
                  <img
                    src={
                      activeItem.instructor?.avatarUrl ||
                      "/creators/team-01.webp"
                    }
                    alt={activeItem.instructor?.name || "Nepali Mentor"}
                    className="size-4 rounded-full border border-white/30 object-cover sm:size-4.5"
                  />
                  <span className="max-w-24 truncate text-[9px] font-semibold text-white sm:max-w-none sm:text-xs">
                    {activeItem.instructor?.name || "Nepali Mentor"}
                  </span>
                </div>

                {/* Course Price */}
                <div className="hero-swipe flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm backdrop-blur-md sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs">
                  <Tag className="size-2.5 text-white sm:size-3" />
                  <span>{activeItem.price || "Rs. 2,999"}</span>
                </div>

                {/* Mobile Rating */}
                <div className="hero-swipe flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.08] px-1.5 py-0.5 font-medium text-white/90 shadow-sm backdrop-blur-md sm:hidden">
                  <Star className="size-2.5 fill-white/80 text-white/80" />
                  <span>{activeItem.rating.toFixed(1)} Rating</span>
                </div>

                {/* Mobile Enrollment */}
                <div className="hero-swipe flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.08] px-1.5 py-0.5 font-medium text-white/90 shadow-sm backdrop-blur-md sm:hidden">
                  <Users className="size-2.5 text-white/80" />
                  <span>
                    {activeItem.enrolledCount.toLocaleString()}+ Enrolled
                  </span>
                </div>

                {/* Total Lessons */}
                <div className="hero-swipe flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.08] px-1.5 py-0.5 text-[9px] font-medium text-white/90 shadow-sm backdrop-blur-md sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs">
                  <BookOpen className="size-2.5 text-white/80 sm:size-3" />
                  <span>
                    {activeItem.totalLessons ||
                      (activeItem.type === "workshop"
                        ? "8 Modules"
                        : "24 Lessons")}
                  </span>
                </div>

                {/* Course Duration */}
                <div className="hero-swipe flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.08] px-1.5 py-0.5 text-[9px] font-medium text-white/90 shadow-sm backdrop-blur-md sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs">
                  <Clock className="size-2.5 text-white/80 sm:size-3" />
                  <span>
                    {activeItem.duration ||
                      (activeItem.type === "workshop"
                        ? "6.0 Hours"
                        : "14.5 Hours")}
                  </span>
                </div>
              </div>

              {/* Dynamic Synopsis: Strictly 2 lines with locked height so button never shifts */}
              <div className="mt-2 flex h-[2.85em] max-w-xl items-center justify-center text-xs leading-[1.4] text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:mt-2.5 sm:text-sm sm:leading-[1.42] lg:text-[15px]">
                <p
                  key={`${activeItem.id}-desc`}
                  className="hero-reveal line-clamp-2 text-center text-white/85"
                >
                  {activeItem.description}
                </p>
              </div>

              {/* Dynamic Interactive CTA Button: Stationary position, never moves or jumps */}
              <div className="hero-reveal mt-3 inline-block sm:mt-4">
                <Link
                  to={activeItem.enrollUrl || "/sign-up"}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-zinc-950 via-zinc-500 to-zinc-950 p-px font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_14px_38px_rgba(0,0,0,0.45)] focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 active:translate-y-0 active:scale-95 dark:from-white/85 dark:via-zinc-500 dark:to-white/85"
                >
                  {/* Inner Button Surface - fixed min-width for stationary centering */}
                  <span className="relative inline-flex h-10 min-w-[190px] items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-white via-zinc-100 to-white px-5 text-xs font-bold text-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl transition-all duration-300 group-hover:from-zinc-50 group-hover:via-white group-hover:to-zinc-100 sm:h-11.5 sm:min-w-[235px] sm:gap-3 sm:px-7 sm:text-sm dark:from-zinc-950 dark:via-zinc-800 dark:to-zinc-950 dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] dark:group-hover:from-black dark:group-hover:via-zinc-900 dark:group-hover:to-black">
                    {/* Surface Shimmer Reflection */}
                    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 -translate-x-full animate-[shimmer-sweep_3.5s_infinite] bg-gradient-to-r from-transparent via-black/8 to-transparent dark:via-white/20" />
                    </span>

                    <span className="relative z-10 tracking-wide">
                      {activeItem.type === "workshop"
                        ? "Join Live Workshop"
                        : "Browse Course"}
                    </span>

                    <span className="relative z-10 flex size-6 items-center justify-center rounded-full bg-zinc-950 text-white shadow-md transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:bg-black sm:size-7 dark:bg-white dark:text-black dark:group-hover:bg-zinc-100">
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            {usesCompactCarousel ? (
              <MobileCourseSlider
                items={heroItems}
                activeIndex={activeIndex}
                onSelect={(index) => setActiveIndex(index)}
              />
            ) : (
              <CourseCarousel
                items={heroItems}
                activeIndex={activeIndex}
                onSelect={(index) => setActiveIndex(index)}
              />
            )}

            {/* Animated "Browse more" button */}
            <a
              href="#explore-content"
              className="group absolute bottom-2 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-0.5 rounded-full border border-white/20 bg-black/70 px-4 py-1.5 text-center text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-black/85 hover:shadow-2xl active:scale-95 lg:bottom-0 lg:flex lg:translate-y-1/2 lg:gap-1 lg:px-6 lg:py-2 dark:border-white/15 dark:hover:bg-black/90"
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
            </a>
          </section>
          <section
            id="explore-content"
            aria-labelledby="explore-heading"
            className="relative scroll-mt-4 border-t border-white/10 bg-[#080a0f] px-4 py-14 text-white sm:px-6 lg:px-10 lg:pt-16 lg:pb-20"
          >
            <div className="mx-auto w-full max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-bold tracking-[0.2em] text-white/55 uppercase">
                  Continue exploring
                </p>
                <h2
                  id="explore-heading"
                  className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
                >
                  Choose how you want to learn
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                  Build practical skills through structured courses, live
                  workshops, one-to-one guidance, and ready-to-use assets.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 lg:mx-auto lg:mt-10 lg:max-w-5xl lg:grid-cols-4 lg:gap-4">
                {[
                  {
                    id: "courses",
                    label: "Browse Courses",
                    detail: "Learn at your pace",
                  },
                  {
                    id: "workshop",
                    label: "Live Workshops",
                    detail: "Practice with experts",
                  },
                  {
                    id: "mentorship",
                    label: "Find a Mentor",
                    detail: "Get 1-on-1 guidance",
                  },
                  {
                    id: "marketplace",
                    label: "Explore Assets",
                    detail: "Use creator resources",
                  },
                ].map((item) => (
                  <Link
                    key={item.id}
                    id={item.id}
                    to="/sign-up"
                    className="group flex min-h-24 items-center justify-between gap-3 rounded-2xl border border-white/12 bg-white/[0.045] p-4 text-left shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/[0.09] hover:shadow-[0_18px_38px_rgba(0,0,0,0.3)] sm:p-5"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-bold sm:text-base">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-[11px] text-white/50 sm:text-xs">
                        {item.detail}
                      </span>
                    </span>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1 sm:size-9">
                      <ArrowRight className="size-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
