import { useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import {
  ArrowRight,
  Calendar,
  Clock,
  LayoutGrid,
  List,
  Sparkles,
  Users,
  Video,
} from "lucide-react"

import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

import { Skeleton } from "@/components/ui/skeleton"

export type ProgramType = "WORKSHOP" | "MENTORSHIP"

export interface ProgramItem {
  id: string
  programType: ProgramType
  title: string
  brief?: string
  description?: string
  coverImageUrl?: string
  thumbnailUrl?: string
  entryFee?: number
  price?: number
  currency?: string
  startDate?: string
  durationDays?: number
  sessionsCount?: number
  mentorName?: string
  mentorRole?: string
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

export function WorkshopsMentorshipsSection() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const { data: programs = [], isLoading } = useQuery<ProgramItem[]>({
    queryKey: ["public-workshops-and-mentorships"],
    queryFn: async () => {
      try {
        const [workshopsRes, mentorshipsRes] = await Promise.allSettled([
          api.get("/public/workshops?page=0&size=12"),
          api.get("/public/mentorships?page=0&size=12"),
        ])

        const items: ProgramItem[] = []

        if (workshopsRes.status === "fulfilled" && workshopsRes.value?.data) {
          const d = workshopsRes.value.data as any
          let list: any[] = []
          if (Array.isArray(d)) list = d
          else if (Array.isArray(d?.workshops)) list = d.workshops
          else if (Array.isArray(d?.data?.workshops)) list = d.data.workshops
          else if (Array.isArray(d?.data)) list = d.data
          else if (Array.isArray(d?.content)) list = d.content

          list.forEach((w) => {
            const rawDesc = stripHtml(
              w.description || w.brief || w.subtitle || ""
            )
            items.push({
              id: w.id,
              programType: "WORKSHOP",
              title: w.title?.trim() || "Live Practical Workshop",
              description: rawDesc,
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
              sessionsCount: Array.isArray(w.sessions)
                ? w.sessions.length
                : undefined,
              mentorName:
                w.mentor?.fullName ||
                [w.mentor?.firstName, w.mentor?.lastName]
                  .filter(Boolean)
                  .join(" "),
              mentorRole: w.mentor?.role || "Workshop Leader",
            })
          })
        }

        if (
          mentorshipsRes.status === "fulfilled" &&
          mentorshipsRes.value?.data
        ) {
          const d = mentorshipsRes.value.data as any
          let list: any[] = []
          if (Array.isArray(d)) list = d
          else if (Array.isArray(d?.mentorships)) list = d.mentorships
          else if (Array.isArray(d?.workshops)) list = d.workshops
          else if (Array.isArray(d?.data?.mentorships))
            list = d.data.mentorships
          else if (Array.isArray(d?.data)) list = d.data
          else if (Array.isArray(d?.content)) list = d.content

          list.forEach((m) => {
            const rawDesc = stripHtml(
              m.description || m.brief || m.subtitle || ""
            )
            items.push({
              id: m.id,
              programType: "MENTORSHIP",
              title: m.title?.trim() || "1-on-1 Mentorship Session",
              description: rawDesc,
              coverImageUrl:
                m.coverImageUrl ||
                m.coverImage ||
                m.thumbnailUrl ||
                m.thumbnail ||
                m.imageUrl ||
                "/creators/team-03.webp",
              entryFee: m.entryFee ?? m.price ?? m.fee,
              currency: m.currency,
              sessionsCount: Array.isArray(m.sessions)
                ? m.sessions.length
                : undefined,
              mentorName:
                m.mentor?.fullName ||
                [m.mentor?.firstName, m.mentor?.lastName]
                  .filter(Boolean)
                  .join(" "),
              mentorRole: m.mentor?.role || "Industry Mentor",
            })
          })
        }

        return items
      } catch (err) {
        console.warn("Failed to load workshops and mentorships:", err)
        return []
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  return (
    <section
      id="workshop"
      aria-labelledby="programs-heading"
      className="relative scroll-mt-4 border-t border-border/80 bg-background px-4 py-12 text-foreground sm:px-6 lg:px-10 lg:py-16"
    >
      <div id="mentorship" className="sr-only" />
      <div id="programs" className="sr-only" />
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-b from-zinc-100 to-zinc-200/60 text-zinc-900 shadow-xs dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 dark:text-zinc-100">
              <Video className="size-5" />
            </div>
            <div>
              <span className="block text-[11px] font-black tracking-widest text-muted-foreground uppercase">
                LIVE &amp; 1-ON-1
              </span>
              <h2
                id="programs-heading"
                className="text-2xl font-black tracking-tight text-foreground sm:text-3xl"
              >
                Workshops &amp; Mentorships
              </h2>
            </div>
          </div>

          {/* Right Controls: View Switcher & "All ->" */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-border bg-card p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex size-8 items-center justify-center rounded-md transition-colors",
                  viewMode === "grid"
                    ? "bg-zinc-900 text-white shadow-xs dark:bg-white dark:text-zinc-900"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex size-8 items-center justify-center rounded-md transition-colors",
                  viewMode === "list"
                    ? "bg-zinc-900 text-white shadow-xs dark:bg-white dark:text-zinc-900"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="List view"
              >
                <List className="size-4" />
              </button>
            </div>

            <Link
              to={"/workshops" as any}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-card px-4 text-xs font-bold text-foreground shadow-2xs transition-colors hover:bg-muted"
            >
              <span>All</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div
            className={cn(
              "mt-8 grid gap-5",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 lg:grid-cols-2"
            )}
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`prog-skeleton-${idx}`}
                className="overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-xs"
              >
                <Skeleton className="aspect-[16/10] w-full rounded-none" />
                <div className="space-y-3 p-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="h-3.5 w-16" />
                  </div>
                  <Skeleton className="h-5 w-full" />
                  <div className="grid grid-cols-2 gap-2">
                    <Skeleton className="h-8 w-full rounded-lg" />
                    <Skeleton className="h-8 w-full rounded-lg" />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && programs.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
            <Video className="mx-auto size-10 text-muted-foreground/60" />
            <h3 className="mt-3 text-base font-bold text-foreground">
              No live programs currently scheduled
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              New workshops and 1-on-1 mentorship slots will be announced soon.
            </p>
          </div>
        )}

        {/* Programs Grid / List */}
        {!isLoading && programs.length > 0 && (
          <div
            className={cn(
              "mt-8 grid gap-5",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 lg:grid-cols-2"
            )}
          >
            {programs.map((program) => {
              const isMentorship = program.programType === "MENTORSHIP"
              const accentColor = isMentorship
                ? {
                    badgeBg:
                      "border border-zinc-700/50 bg-zinc-950 text-white dark:border-zinc-300/50 dark:bg-white dark:text-zinc-950",
                    hoverBorder:
                      "hover:border-zinc-400 dark:hover:border-zinc-700",
                    btnText: "",
                    btnBg:
                      "border-zinc-300/80 bg-zinc-100 text-zinc-900 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-white dark:hover:bg-white dark:hover:text-zinc-950",
                    categoryText: "text-muted-foreground",
                  }
                : {
                    badgeBg:
                      "border border-zinc-700/50 bg-zinc-900 text-white dark:border-zinc-300/50 dark:bg-zinc-100 dark:text-zinc-900",
                    hoverBorder:
                      "hover:border-zinc-400 dark:hover:border-zinc-700",
                    btnText: "",
                    btnBg:
                      "border-zinc-300/80 bg-zinc-100 text-zinc-900 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-white dark:hover:bg-white dark:hover:text-zinc-950",
                    categoryText: "text-muted-foreground",
                  }

              const primaryMeta = isMentorship
                ? `${program.sessionsCount ?? 1} Session${program.sessionsCount === 1 ? "" : "s"}`
                : formatDate(program.startDate)

              const secondaryMeta = isMentorship
                ? "1-on-1 Guidance"
                : `${program.durationDays || 1} Day${program.durationDays === 1 ? "" : "s"}`

              return (
                <div
                  key={`${program.programType}-${program.id}`}
                  className={cn(
                    "group relative flex overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                    accentColor.hoverBorder,
                    viewMode === "list" ? "flex-col sm:flex-row" : "flex-col"
                  )}
                >
                  {/* Thumbnail */}
                  <div
                    className={cn(
                      "relative aspect-[16/10] overflow-hidden bg-muted",
                      viewMode === "list"
                        ? "w-full sm:w-56 sm:shrink-0"
                        : "w-full"
                    )}
                  >
                    <img
                      src={program.coverImageUrl}
                      alt={program.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top-Left Badge */}
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md border border-white/40 bg-white/95 px-2 py-0.5 text-[10px] font-black tracking-wide text-zinc-900 uppercase shadow-xs backdrop-blur-xs dark:border-white/20 dark:bg-black/85 dark:text-white">
                      {isMentorship ? (
                        <Users className="size-2.5" />
                      ) : (
                        <Sparkles className="size-2.5" />
                      )}
                      <span>
                        {isMentorship ? "Mentorship" : "Live Workshop"}
                      </span>
                    </span>

                    {/* Bottom-Right Category Badge */}
                    <span
                      className={cn(
                        "absolute right-2.5 bottom-2.5 inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-black tracking-wider uppercase shadow-md",
                        accentColor.badgeBg
                      )}
                    >
                      {program.programType}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col p-4">
                    {/* Header Row: Mentor name & category */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-black tracking-wider text-muted-foreground uppercase">
                        {program.mentorName ||
                          (isMentorship ? "Expert Mentor" : "Instructor")}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-bold uppercase",
                          accentColor.categoryText
                        )}
                      >
                        {isMentorship ? "Personal Track" : "Live Interactive"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={cn(
                        "mt-2 leading-snug font-bold text-foreground transition-colors group-hover:text-foreground/80",
                        viewMode === "list"
                          ? "line-clamp-2 text-sm sm:text-base"
                          : "line-clamp-2 min-h-[2.85rem] text-[15px]"
                      )}
                      title={program.title}
                    >
                      {program.title}
                    </h3>

                    {/* Description snippet */}
                    {program.description && (
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {program.description}
                      </p>
                    )}

                    {/* Meta Row */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground dark:bg-muted/30">
                        {isMentorship ? (
                          <Users className="size-3.5 shrink-0 text-muted-foreground/80" />
                        ) : (
                          <Calendar className="size-3.5 shrink-0 text-muted-foreground/80" />
                        )}
                        <span className="truncate">{primaryMeta}</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground dark:bg-muted/30">
                        <Clock className="size-3.5 shrink-0 text-muted-foreground/80" />
                        <span className="truncate">{secondaryMeta}</span>
                      </div>
                    </div>

                    {/* Footer Row: Price & Action */}
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <span className="text-base font-black text-foreground">
                        {formatPrice(program.entryFee, program.currency)}
                      </span>

                      <Link
                        to={
                          (isMentorship
                            ? `/mentorships/${program.id}`
                            : `/workshops/${program.id}`) as any
                        }
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold shadow-2xs transition-all",
                          accentColor.btnBg,
                          accentColor.btnText
                        )}
                      >
                        <span>
                          {isMentorship ? "Book session" : "Join workshop"}
                        </span>
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
