import { useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Clock,
  LayoutGrid,
  List,
  Star,
} from "lucide-react"

import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

import { Skeleton } from "@/components/ui/skeleton"

export interface CourseCatalogItem {
  id: string
  title: string
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | string
  language?: string
  price?: number | string
  currency?: string
  thumbnailUrl?: string
  coverImageUrl?: string
  coverImage?: string
  tenantName?: string
  lectureCount?: number
  totalLessons?: number
  totalDurationSeconds?: number
  durationSeconds?: number
  avgRating?: number
  reviewCount?: number
}

function formatDuration(seconds?: number | string | null): string {
  if (!seconds || seconds === 0) return "0 min"
  if (typeof seconds === "string") return seconds
  const totalMinutes = Math.round(seconds / 60)
  if (totalMinutes < 60) return `${totalMinutes} min`
  const hours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60
  return remainingMinutes > 0
    ? `${hours}h ${remainingMinutes}m`
    : `${hours} hrs`
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

export function AllCoursesSection() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const { data: courses = [], isLoading } = useQuery<CourseCatalogItem[]>({
    queryKey: ["all-public-courses"],
    queryFn: async () => {
      try {
        const res = await api.get<{ courses?: CourseCatalogItem[] }>(
          "/public/courses"
        )
        const d = res.data as any
        let list: CourseCatalogItem[] = []
        if (Array.isArray(d)) list = d
        else if (Array.isArray(d?.courses)) list = d.courses
        else if (Array.isArray(d?.data?.courses)) list = d.data.courses
        else if (Array.isArray(d?.data)) list = d.data
        else if (Array.isArray(d?.content)) list = d.content
        else if (Array.isArray(d?.items)) list = d.items

        return list
      } catch (err) {
        console.warn("Failed to load public courses:", err)
        return []
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  return (
    <section
      id="courses"
      aria-labelledby="all-courses-heading"
      className="relative scroll-mt-4 border-t border-border/80 bg-gradient-to-b from-background via-muted/20 to-background px-4 py-12 text-foreground transition-colors sm:px-6 lg:px-10 lg:py-16 dark:bg-background"
    >
      <div id="explore-content" className="sr-only" />
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-b from-zinc-100 to-zinc-200/60 text-zinc-900 shadow-xs dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 dark:text-zinc-100">
              <BookMarked className="size-5" />
            </div>
            <div>
              <span className="block text-[11px] font-black tracking-widest text-muted-foreground uppercase">
                COURSES
              </span>
              <h2
                id="all-courses-heading"
                className="text-2xl font-black tracking-tight text-foreground sm:text-3xl"
              >
                All Courses
              </h2>
            </div>
          </div>

          {/* Right Controls: View Switcher & "All ->" Button */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
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
              to="/courses"
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
                key={`course-skeleton-${idx}`}
                className="overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-xs"
              >
                <Skeleton className="aspect-[16/10] w-full rounded-none" />
                <div className="space-y-3 p-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="h-3.5 w-12" />
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
        {!isLoading && courses.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
            <BookMarked className="mx-auto size-10 text-muted-foreground/60" />
            <h3 className="mt-3 text-base font-bold text-foreground">
              No courses available
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              New learning courses will be published soon.
            </p>
          </div>
        )}

        {/* Courses Catalog Grid / List */}
        {!isLoading && courses.length > 0 && (
          <div
            className={cn(
              "mt-8 grid gap-5",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 lg:grid-cols-2"
            )}
          >
            {courses.map((course) => {
              const thumbnail =
                course.thumbnailUrl ||
                course.coverImageUrl ||
                course.coverImage ||
                "/creators/team-01.webp"

              return (
                <div
                  key={course.id}
                  className={cn(
                    "group relative flex overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-lg dark:hover:border-zinc-700",
                    viewMode === "list" ? "flex-col sm:flex-row" : "flex-col"
                  )}
                >
                  {/* Thumbnail Image Section */}
                  <div
                    className={cn(
                      "relative aspect-[16/10] overflow-hidden bg-muted",
                      viewMode === "list"
                        ? "w-full sm:w-56 sm:shrink-0"
                        : "w-full"
                    )}
                  >
                    <img
                      src={thumbnail}
                      alt={course.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top-Left Level Badge */}
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center rounded-md border border-white/40 bg-white/95 px-2 py-0.5 text-[10px] font-black tracking-wide text-zinc-900 uppercase shadow-xs backdrop-blur-xs dark:border-white/20 dark:bg-black/85 dark:text-white">
                      {course.level || "BEGINNER"}
                    </span>

                    {/* Bottom-Right Category/Type Badge */}
                    <span className="absolute right-2.5 bottom-2.5 inline-flex items-center rounded-md border border-zinc-700/50 bg-zinc-950 px-2 py-0.5 text-[10px] font-black tracking-wider text-white uppercase shadow-md dark:border-zinc-300/50 dark:bg-white dark:text-zinc-950">
                      COURSE
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-4">
                    {/* Tenant & Language Meta */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-black tracking-wider text-muted-foreground uppercase">
                        {course.tenantName || "NEPALIMENTOR"}
                      </span>
                      <span className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                        {course.language || "English"}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3
                      className={cn(
                        "mt-2 leading-snug font-bold text-foreground transition-colors group-hover:text-foreground/80",
                        viewMode === "list"
                          ? "line-clamp-2 text-sm sm:text-base"
                          : "line-clamp-2 min-h-[2.75rem] text-[15px]"
                      )}
                      title={course.title}
                    >
                      {course.title}
                    </h3>

                    {/* Stats Row: Duration & Lessons */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground dark:bg-muted/30">
                        <Clock className="size-3.5 shrink-0 text-muted-foreground/80" />
                        <span className="truncate">
                          {formatDuration(
                            course.totalDurationSeconds ??
                              course.durationSeconds
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground dark:bg-muted/30">
                        <BookOpen className="size-3.5 shrink-0 text-muted-foreground/80" />
                        <span className="truncate">
                          {course.lectureCount ?? course.totalLessons ?? 0}{" "}
                          lessons
                        </span>
                      </div>
                    </div>

                    {/* Status / Reviews */}
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      {course.avgRating && course.avgRating > 0 ? (
                        <div className="flex items-center gap-1 font-bold text-foreground">
                          <Star className="size-3.5 fill-foreground text-foreground" />
                          <span>{course.avgRating.toFixed(1)}</span>
                          {course.reviewCount ? (
                            <span className="font-normal text-muted-foreground">
                              ({course.reviewCount})
                            </span>
                          ) : null}
                        </div>
                      ) : (
                        <span className="text-muted-foreground/80">
                          New course
                        </span>
                      )}
                    </div>

                    {/* Card Footer: Price & View Course Button */}
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <span className="text-base font-black text-foreground">
                        {formatPrice(course.price, course.currency)}
                      </span>

                      <Link
                        to={course.id ? `/courses/${course.id}` : "/sign-up"}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-gradient-to-b from-zinc-100 to-zinc-200/80 px-3 py-1.5 text-xs font-bold text-zinc-900 shadow-2xs transition-all hover:bg-zinc-900 hover:text-white dark:border-zinc-700 dark:bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-100 dark:hover:bg-white dark:hover:text-zinc-950"
                      >
                        <span>View course</span>
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
