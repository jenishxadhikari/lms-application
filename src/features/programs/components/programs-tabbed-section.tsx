import { useEffect, useMemo, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import {
  ArrowRight,
  Calendar,
  Clock,
  LayoutGrid,
  List,
  Package,
  Sparkles,
  Tag,
  Users,
  Video,
} from "lucide-react"

import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export type ProgramTabKey = "workshops" | "mentorships" | "bundles"

export interface WorkshopItem {
  id: string
  title: string
  brief?: string
  description?: string
  coverImageUrl: string
  entryFee?: number
  currency?: string
  startDate?: string
  durationDays?: number
  mentorName?: string
  mentorRole?: string
}

export interface MentorshipItem {
  id: string
  title: string
  brief?: string
  description?: string
  coverImageUrl: string
  entryFee?: number
  currency?: string
  sessionsCount?: number
  mentorName?: string
  mentorRole?: string
}

export interface BundleCourseItem {
  id: string
  title: string
  price?: number
  thumbnailUrl?: string
}

export interface BundleItem {
  id: string
  name: string
  description?: string
  thumbnailUrl?: string
  discountPercent?: number
  courses?: BundleCourseItem[]
  combinedValue?: number
  finalFee?: number
  currency?: string
}

function stripHtml(html: string = ""): string {
  return html.replace(/<[^>]*>?/gm, "").trim()
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "Upcoming Session"
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return "Upcoming Session"
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return "Upcoming Session"
  }
}

function formatPrice(
  price?: number | string | null,
  currency?: string
): string {
  if (price === 0 || price === "0" || !price) return "Free"
  if (typeof price === "number") {
    return currency &&
      currency.toLowerCase() !== "npr" &&
      currency.toLowerCase() !== "rs"
      ? `${currency.toUpperCase()} ${price.toLocaleString()}`
      : `Rs. ${price.toLocaleString()}`
  }
  return String(price)
}

export function ProgramsTabbedSection() {
  const [activeTab, setActiveTab] = useState<ProgramTabKey>("workshops")
  // By default set to "list" view to save vertical space
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  // Support hash routing (#workshop, #mentorship, #bundles, #marketplace)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === "#workshop" || hash === "#workshops") {
        setActiveTab("workshops")
      } else if (hash === "#mentorship" || hash === "#mentorships") {
        setActiveTab("mentorships")
      } else if (
        hash === "#bundles" ||
        hash === "#bundle" ||
        hash === "#marketplace"
      ) {
        setActiveTab("bundles")
      }
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // 1. Fetch Workshops
  const { data: workshops = [], isLoading: isWorkshopsLoading } = useQuery<
    WorkshopItem[]
  >({
    queryKey: ["public-tab-workshops"],
    queryFn: async () => {
      try {
        const res = await api.get("/public/workshops?page=0&size=12")
        const d = res.data as any
        let list: any[] = []
        if (Array.isArray(d)) list = d
        else if (Array.isArray(d?.workshops)) list = d.workshops
        else if (Array.isArray(d?.data?.workshops)) list = d.data.workshops
        else if (Array.isArray(d?.data)) list = d.data
        else if (Array.isArray(d?.content)) list = d.content
        else if (Array.isArray(d?.items)) list = d.items

        return list.map((w) => ({
          id: w.id,
          title: w.title?.trim() || "Live Practical Workshop",
          description: stripHtml(w.description || w.brief || w.subtitle || ""),
          coverImageUrl:
            w.coverImageUrl ||
            w.coverImage ||
            w.thumbnailUrl ||
            w.thumbnail ||
            w.imageUrl ||
            "/creators/team-02.webp",
          entryFee: w.entryFee ?? w.price ?? w.fee,
          currency: w.currency,
          startDate: w.startDate,
          durationDays: w.durationDays,
          mentorName:
            w.mentor?.fullName ||
            [w.mentor?.firstName, w.mentor?.lastName].filter(Boolean).join(" "),
          mentorRole: w.mentor?.role || "Workshop Leader",
        }))
      } catch (err) {
        console.warn("Failed to load public workshops:", err)
        return []
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  // 2. Fetch Mentorships (handles backend workshops key fallback)
  const { data: mentorships = [], isLoading: isMentorshipsLoading } = useQuery<
    MentorshipItem[]
  >({
    queryKey: ["public-tab-mentorships"],
    queryFn: async () => {
      try {
        const res = await api.get("/public/mentorships?page=0&size=12")
        const d = res.data as any
        let list: any[] = []
        if (Array.isArray(d)) list = d
        else if (Array.isArray(d?.mentorships)) list = d.mentorships
        else if (Array.isArray(d?.workshops)) list = d.workshops
        else if (Array.isArray(d?.data?.mentorships)) list = d.data.mentorships
        else if (Array.isArray(d?.data?.workshops)) list = d.data.workshops
        else if (Array.isArray(d?.data)) list = d.data
        else if (Array.isArray(d?.content)) list = d.content
        else if (Array.isArray(d?.items)) list = d.items

        return list.map((m) => ({
          id: m.id,
          title: m.title?.trim() || "Personal 1-on-1 Mentorship",
          description: stripHtml(m.description || m.brief || m.subtitle || ""),
          coverImageUrl:
            m.coverImageUrl ||
            m.coverImage ||
            m.thumbnailUrl ||
            m.thumbnail ||
            m.imageUrl ||
            "/creators/team-03.webp",
          entryFee: m.entryFee ?? m.price ?? m.fee,
          currency: m.currency,
          sessionsCount: m.sessionsCount || m.sessionCount || 1,
          mentorName:
            m.mentor?.fullName ||
            [m.mentor?.firstName, m.mentor?.lastName].filter(Boolean).join(" "),
          mentorRole: m.mentor?.role || "Industry Mentor",
        }))
      } catch (err) {
        console.warn("Failed to load public mentorships:", err)
        return []
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  // 3. Fetch Bundles
  const { data: bundles = [], isLoading: isBundlesLoading } = useQuery<
    BundleItem[]
  >({
    queryKey: ["public-tab-bundles"],
    queryFn: async () => {
      try {
        const res = await api.get<{ bundles?: BundleItem[] }>(
          "/public/bundles?page=0&size=12"
        )
        const d = res.data as any
        let list: BundleItem[] = []
        if (Array.isArray(d)) list = d
        else if (Array.isArray(d?.bundles)) list = d.bundles
        else if (Array.isArray(d?.data?.bundles)) list = d.data.bundles
        else if (Array.isArray(d?.data)) list = d.data
        else if (Array.isArray(d?.content)) list = d.content
        else if (Array.isArray(d?.items)) list = d.items

        return list
      } catch (err) {
        console.warn("Failed to load public bundles:", err)
        return []
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  const currentMeta = useMemo(() => {
    switch (activeTab) {
      case "workshops":
        return {
          icon: <Video className="size-5" />,
          label: "LIVE COHORTS",
          title: "Live Workshops",
          description:
            "Cohort-based practical workshops with live coding, Q&A, and direct instructor feedback.",
          viewAllLink: "/workshops",
          isLoading: isWorkshopsLoading,
          count: workshops.length,
        }
      case "mentorships":
        return {
          icon: <Users className="size-5" />,
          label: "PERSONAL TRACK",
          title: "1-on-1 Mentorship",
          description:
            "Personalized 1-on-1 mentoring sessions for code reviews, career growth, and technical roadmap.",
          viewAllLink: "/mentorships",
          isLoading: isMentorshipsLoading,
          count: mentorships.length,
        }
      case "bundles":
        return {
          icon: <Package className="size-5" />,
          label: "BUNDLE & SAVE",
          title: "Course Bundles",
          description:
            "Curated bundles of complete course tracks discounted for comprehensive end-to-end learning.",
          viewAllLink: "/bundles",
          isLoading: isBundlesLoading,
          count: bundles.length,
        }
    }
  }, [
    activeTab,
    isWorkshopsLoading,
    isMentorshipsLoading,
    isBundlesLoading,
    workshops.length,
    mentorships.length,
    bundles.length,
  ])

  return (
    <section
      id="programs"
      aria-labelledby="programs-tabbed-heading"
      className="relative scroll-mt-4 overflow-hidden border-y border-zinc-800 bg-[#09090b] px-4 py-12 text-white shadow-2xl transition-colors sm:px-6 lg:px-10 lg:py-16"
    >
      {/* Anchor targets for navbar clicks */}
      <div id="workshop" className="sr-only" />
      <div id="mentorship" className="sr-only" />
      <div id="bundles" className="sr-only" />
      <div id="marketplace" className="sr-only" />

      {/* Atmospheric Animated Background Layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.09),transparent_70%)]" />
      <div className="animate-mesh-float pointer-events-none absolute -top-32 left-1/4 size-[450px] rounded-full bg-gradient-to-br from-white/10 via-zinc-400/5 to-transparent blur-3xl" />
      <div className="animate-mesh-float-reverse pointer-events-none absolute top-1/2 right-1/4 size-[400px] rounded-full bg-gradient-to-tl from-white/8 via-zinc-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_60%,transparent_100%)] [background-size:24px_24px] opacity-80" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 text-white shadow-xs">
              {currentMeta.icon}
            </div>
            <div>
              <span className="block text-[11px] font-black tracking-widest text-zinc-400 uppercase">
                {currentMeta.label}
              </span>
              <h2
                id="programs-tabbed-heading"
                className="text-xl font-black tracking-tight text-white sm:text-2xl"
              >
                {currentMeta.title}
              </h2>
            </div>
          </div>

          {/* Right Controls: View Mode & "All ->" */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900/90 p-1 shadow-2xs">
              <Button
                type="button"
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon-xs"
                onClick={() => setViewMode("list")}
                className={cn(
                  "size-7 transition-colors",
                  viewMode === "list"
                    ? "bg-white text-zinc-950 shadow-xs hover:bg-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                )}
                aria-label="List view"
              >
                <List className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon-xs"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "size-7 transition-colors",
                  viewMode === "grid"
                    ? "bg-white text-zinc-950 shadow-xs hover:bg-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="size-3.5" />
              </Button>
            </div>

            <Link
              to={currentMeta.viewAllLink}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900/90 px-3.5 text-xs font-bold text-white shadow-2xs transition-colors hover:border-zinc-600 hover:bg-zinc-800"
            >
              <span>All</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5 border-b border-zinc-800 pb-4">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "workshops"}
            onClick={() => setActiveTab("workshops")}
            className={cn(
              "group relative inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 outline-none select-none sm:text-sm",
              activeTab === "workshops"
                ? "bg-white text-zinc-950 shadow-md ring-1 ring-white/20"
                : "border-zinc-750 hover:bg-zinc-850 border bg-zinc-900/70 text-zinc-400 hover:border-zinc-500 hover:text-white"
            )}
          >
            <Video
              className={cn(
                "size-4 transition-transform group-hover:scale-105",
                activeTab === "workshops" ? "text-zinc-950" : "text-zinc-400"
              )}
            />
            <span>Workshops</span>
            <span
              className={cn(
                "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-black transition-colors",
                activeTab === "workshops"
                  ? "bg-zinc-950/15 text-zinc-950"
                  : "bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700 group-hover:text-white"
              )}
            >
              {workshops.length}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "mentorships"}
            onClick={() => setActiveTab("mentorships")}
            className={cn(
              "group relative inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 outline-none select-none sm:text-sm",
              activeTab === "mentorships"
                ? "bg-white text-zinc-950 shadow-md ring-1 ring-white/20"
                : "border-zinc-750 hover:bg-zinc-850 border bg-zinc-900/70 text-zinc-400 hover:border-zinc-500 hover:text-white"
            )}
          >
            <Users
              className={cn(
                "size-4 transition-transform group-hover:scale-110",
                activeTab === "mentorships" ? "text-zinc-950" : "text-zinc-400"
              )}
            />
            <span>Mentorships</span>
            <span
              className={cn(
                "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-black transition-colors",
                activeTab === "mentorships"
                  ? "bg-zinc-950/15 text-zinc-950"
                  : "bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700 group-hover:text-white"
              )}
            >
              {mentorships.length}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "bundles"}
            onClick={() => setActiveTab("bundles")}
            className={cn(
              "group relative inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 outline-none select-none sm:text-sm",
              activeTab === "bundles"
                ? "bg-white text-zinc-950 shadow-md ring-1 ring-white/20"
                : "border-zinc-750 hover:bg-zinc-850 border bg-zinc-900/70 text-zinc-400 hover:border-zinc-500 hover:text-white"
            )}
          >
            <Package
              className={cn(
                "size-4 transition-transform group-hover:scale-110",
                activeTab === "bundles" ? "text-zinc-950" : "text-zinc-400"
              )}
            />
            <span>Bundles</span>
            <span
              className={cn(
                "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-black transition-colors",
                activeTab === "bundles"
                  ? "bg-zinc-950/15 text-zinc-950"
                  : "bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700 group-hover:text-white"
              )}
            >
              {bundles.length}
            </span>
          </button>
        </div>

        {/* Loading Skeletons */}
        {currentMeta.isLoading && (
          <div
            className={cn(
              "mt-6 grid gap-4",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 lg:grid-cols-2"
            )}
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`prog-skel-${idx}`}
                className={cn(
                  "overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-0 shadow-xs",
                  viewMode === "list"
                    ? "flex-col sm:h-50 sm:flex-row"
                    : "flex-col"
                )}
              >
                <Skeleton
                  className={cn(
                    "rounded-none bg-zinc-800",
                    viewMode === "list"
                      ? "aspect-[16/10] w-full sm:aspect-auto sm:h-full sm:w-56"
                      : "aspect-[16/10] w-full"
                  )}
                />
                <div className="flex flex-1 flex-col justify-between space-y-2 p-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-20 bg-zinc-800" />
                    <Skeleton className="h-3 w-14 bg-zinc-800" />
                  </div>
                  <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                  <Skeleton className="h-3 w-full bg-zinc-800" />
                  <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-4 w-16 bg-zinc-800" />
                    <Skeleton className="h-7 w-20 rounded-lg bg-zinc-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 1: WORKSHOPS */}
        {!currentMeta.isLoading && activeTab === "workshops" && (
          <>
            {workshops.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/60 p-10 text-center">
                <Video className="mx-auto size-9 text-zinc-500" />
                <h3 className="mt-3 text-sm font-bold text-white">
                  No workshops currently scheduled
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  New cohorts will be announced soon.
                </p>
              </div>
            ) : (
              <div
                className={cn(
                  "mt-6 grid gap-4",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 lg:grid-cols-2"
                )}
              >
                {workshops.map((workshop) => (
                  <div
                    key={workshop.id}
                    className={cn(
                      "group relative flex overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 text-white shadow-xl transition-all duration-200 hover:border-zinc-600 hover:shadow-2xl",
                      viewMode === "list"
                        ? "flex-col sm:h-50 sm:flex-row"
                        : "flex-col"
                    )}
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden bg-zinc-900",
                        viewMode === "list"
                          ? "aspect-[16/10] w-full sm:aspect-auto sm:h-full sm:w-56 sm:shrink-0"
                          : "aspect-[16/10] w-full"
                      )}
                    >
                      <img
                        src={workshop.coverImageUrl}
                        alt={workshop.title}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge
                        variant="secondary"
                        className="absolute top-2.5 left-2.5 gap-1 border border-white/20 bg-black/85 text-[10px] font-black text-white uppercase shadow-xs backdrop-blur-xs"
                      >
                        <Sparkles className="size-2.5" />
                        <span>Live Workshop</span>
                      </Badge>
                      <Badge
                        variant="default"
                        className="absolute right-2.5 bottom-2.5 border border-zinc-700 bg-zinc-950 text-[9px] font-black tracking-wider text-white uppercase shadow-md"
                      >
                        WORKSHOP
                      </Badge>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[11px] font-black tracking-wider text-zinc-400 uppercase">
                            {workshop.mentorName || "Instructor"}
                          </span>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase">
                            Live Interactive
                          </span>
                        </div>

                        <h3
                          className={cn(
                            "mt-1 leading-snug font-bold text-white transition-colors group-hover:text-zinc-200",
                            viewMode === "list"
                              ? "line-clamp-2 text-sm sm:text-[15px]"
                              : "line-clamp-2 min-h-[2.75rem] text-[15px]"
                          )}
                          title={workshop.title}
                        >
                          {workshop.title}
                        </h3>

                        {workshop.description && (
                          <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-zinc-400">
                            {workshop.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                        <div className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-800/80 px-2 py-1 text-[11px] font-medium text-zinc-300">
                          <Calendar className="size-3 shrink-0 text-zinc-400" />
                          <span className="truncate">
                            {formatDate(workshop.startDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-800/80 px-2 py-1 text-[11px] font-medium text-zinc-300">
                          <Clock className="size-3 shrink-0 text-zinc-400" />
                          <span className="truncate">
                            {workshop.durationDays || 1} Day
                            {workshop.durationDays === 1 ? "" : "s"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2.5">
                        <span className="text-sm font-black text-white">
                          {formatPrice(workshop.entryFee, workshop.currency)}
                        </span>
                        <Link
                          to={`/workshops/${workshop.id}` as any}
                          className="inline-flex h-7 items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 text-xs font-bold text-white transition-colors hover:bg-white hover:text-zinc-950"
                        >
                          <span>Join workshop</span>
                          <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* TAB 2: MENTORSHIPS */}
        {!currentMeta.isLoading && activeTab === "mentorships" && (
          <>
            {mentorships.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/60 p-10 text-center">
                <Users className="mx-auto size-9 text-zinc-500" />
                <h3 className="mt-3 text-sm font-bold text-white">
                  No mentorship slots currently open
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  1-on-1 mentorship bookings will be released soon.
                </p>
              </div>
            ) : (
              <div
                className={cn(
                  "mt-6 grid gap-4",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 lg:grid-cols-2"
                )}
              >
                {mentorships.map((mentorship) => (
                  <div
                    key={mentorship.id}
                    className={cn(
                      "group relative flex overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 text-white shadow-xl transition-all duration-200 hover:border-zinc-600 hover:shadow-2xl",
                      viewMode === "list"
                        ? "flex-col sm:h-50 sm:flex-row"
                        : "flex-col"
                    )}
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden bg-zinc-900",
                        viewMode === "list"
                          ? "aspect-[16/10] w-full sm:aspect-auto sm:h-full sm:w-56 sm:shrink-0"
                          : "aspect-[16/10] w-full"
                      )}
                    >
                      <img
                        src={mentorship.coverImageUrl}
                        alt={mentorship.title}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge
                        variant="secondary"
                        className="absolute top-2.5 left-2.5 gap-1 border border-white/20 bg-black/85 text-[10px] font-black text-white uppercase shadow-xs backdrop-blur-xs"
                      >
                        <Users className="size-2.5" />
                        <span>1-on-1 Mentorship</span>
                      </Badge>
                      <Badge
                        variant="default"
                        className="absolute right-2.5 bottom-2.5 border border-zinc-700 bg-zinc-950 text-[9px] font-black tracking-wider text-white uppercase shadow-md"
                      >
                        MENTORSHIP
                      </Badge>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[11px] font-black tracking-wider text-zinc-400 uppercase">
                            {mentorship.mentorName || "Expert Mentor"}
                          </span>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase">
                            Personal Track
                          </span>
                        </div>

                        <h3
                          className={cn(
                            "mt-1 leading-snug font-bold text-white transition-colors group-hover:text-zinc-200",
                            viewMode === "list"
                              ? "line-clamp-2 text-sm sm:text-[15px]"
                              : "line-clamp-2 min-h-[2.75rem] text-[15px]"
                          )}
                          title={mentorship.title}
                        >
                          {mentorship.title}
                        </h3>

                        {mentorship.description && (
                          <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-zinc-400">
                            {mentorship.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                        <div className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-800/80 px-2 py-1 text-[11px] font-medium text-zinc-300">
                          <Users className="size-3 shrink-0 text-zinc-400" />
                          <span className="truncate">1-on-1 Private</span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-800/80 px-2 py-1 text-[11px] font-medium text-zinc-300">
                          <Clock className="size-3 shrink-0 text-zinc-400" />
                          <span className="truncate">
                            {mentorship.sessionsCount || 1} Live Session
                            {(mentorship.sessionsCount || 1) === 1 ? "" : "s"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2.5">
                        <span className="text-sm font-black text-white">
                          {formatPrice(
                            mentorship.entryFee,
                            mentorship.currency
                          )}
                        </span>
                        <Link
                          to={`/mentorships/${mentorship.id}` as any}
                          className="inline-flex h-7 items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 text-xs font-bold text-white transition-colors hover:bg-white hover:text-zinc-950"
                        >
                          <span>Book 1-on-1</span>
                          <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* TAB 3: BUNDLES */}
        {!currentMeta.isLoading && activeTab === "bundles" && (
          <>
            {bundles.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/60 p-10 text-center">
                <Package className="mx-auto size-9 text-zinc-500" />
                <h3 className="mt-3 text-sm font-bold text-white">
                  No bundles currently published
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Packaged course bundles will appear here once released.
                </p>
              </div>
            ) : (
              <div
                className={cn(
                  "mt-6 grid gap-4",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 lg:grid-cols-2"
                )}
              >
                {bundles.map((bundle) => {
                  const courses = bundle.courses || []
                  const thumbnail =
                    bundle.thumbnailUrl ||
                    courses[0]?.thumbnailUrl ||
                    "/creators/team-04.webp"

                  const combinedValue = Number(
                    bundle.combinedValue ??
                      courses.reduce((sum, c) => sum + Number(c.price || 0), 0)
                  )
                  const finalFee = Number(bundle.finalFee ?? combinedValue)
                  const discountPercent = Number(bundle.discountPercent || 0)
                  const desc = stripHtml(bundle.description || "")

                  return (
                    <div
                      key={bundle.id}
                      className={cn(
                        "group relative flex overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 text-white shadow-xl transition-all duration-200 hover:border-zinc-600 hover:shadow-2xl",
                        viewMode === "list"
                          ? "flex-col sm:h-50 sm:flex-row"
                          : "flex-col"
                      )}
                    >
                      <div
                        className={cn(
                          "relative overflow-hidden bg-zinc-900",
                          viewMode === "list"
                            ? "aspect-[16/10] w-full sm:aspect-auto sm:h-full sm:w-56 sm:shrink-0"
                            : "aspect-[16/10] w-full"
                        )}
                      >
                        <img
                          src={thumbnail}
                          alt={bundle.name}
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <Badge
                          variant="secondary"
                          className="absolute top-2.5 left-2.5 gap-1 border border-white/20 bg-black/85 text-[10px] font-black text-white uppercase shadow-xs backdrop-blur-xs"
                        >
                          <Sparkles className="size-2.5" />
                          <span>Course Bundle</span>
                        </Badge>

                        {discountPercent > 0 && (
                          <Badge
                            variant="default"
                            className="absolute right-2.5 bottom-2.5 gap-1 border border-zinc-700 bg-zinc-950 text-[9px] font-black tracking-wider text-white uppercase shadow-md"
                          >
                            <Tag className="size-2.5" />
                            <span>{discountPercent.toFixed(0)}% OFF</span>
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-[11px] font-black tracking-wider text-zinc-400 uppercase">
                              Bundle Package
                            </span>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase">
                              Curated Track
                            </span>
                          </div>

                          <h3
                            className={cn(
                              "mt-1 leading-snug font-bold text-white transition-colors group-hover:text-zinc-200",
                              viewMode === "list"
                                ? "line-clamp-2 text-sm sm:text-[15px]"
                                : "line-clamp-2 min-h-[2.75rem] text-[15px]"
                            )}
                            title={bundle.name}
                          >
                            {bundle.name}
                          </h3>

                          {desc && (
                            <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-zinc-400">
                              {desc}
                            </p>
                          )}
                        </div>

                        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                          <div className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-800/80 px-2 py-1 text-[11px] font-medium text-zinc-300">
                            <Package className="size-3 shrink-0 text-zinc-400" />
                            <span className="truncate">
                              {courses.length} Course
                              {courses.length === 1 ? "" : "s"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-800/80 px-2 py-1 text-[11px] font-medium text-zinc-300">
                            <Tag className="size-3 shrink-0 text-zinc-400" />
                            <span className="truncate">
                              {discountPercent > 0
                                ? `${discountPercent.toFixed(0)}% Savings`
                                : "All-in-one"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-2.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-black text-white">
                              {formatPrice(finalFee, bundle.currency)}
                            </span>
                            {combinedValue > finalFee && (
                              <span className="text-xs font-medium text-zinc-500 line-through">
                                {formatPrice(combinedValue, bundle.currency)}
                              </span>
                            )}
                          </div>

                          <Link
                            to={`/bundles/${bundle.id}` as any}
                            className="inline-flex h-7 items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 text-xs font-bold text-white transition-colors hover:bg-white hover:text-zinc-950"
                          >
                            <span>View bundle</span>
                            <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
