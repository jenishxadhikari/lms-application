import { useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import {
  ArrowRight,
  LayoutGrid,
  List,
  Package,
  Sparkles,
  Tag,
} from "lucide-react"

import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

import { Skeleton } from "@/components/ui/skeleton"

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

export function CourseBundlesSection() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const { data: bundles = [], isLoading } = useQuery<BundleItem[]>({
    queryKey: ["public-course-bundles"],
    queryFn: async () => {
      try {
        const res = await api.get<{ bundles?: BundleItem[] }>(
          "/public/bundles?page=0&size=8"
        )
        const d = res.data as any
        let list: BundleItem[] = []
        if (Array.isArray(d)) list = d
        else if (Array.isArray(d?.bundles)) list = d.bundles
        else if (Array.isArray(d?.data?.bundles)) list = d.data.bundles
        else if (Array.isArray(d?.data)) list = d.data
        else if (Array.isArray(d?.content)) list = d.content

        return list
      } catch (err) {
        console.warn("Failed to load course bundles:", err)
        return []
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  // If no bundles are returned from the backend, don't show an awkward empty section
  if (!isLoading && bundles.length === 0) {
    return null
  }

  return (
    <section
      id="bundles"
      aria-labelledby="bundles-heading"
      className="relative scroll-mt-4 border-t border-border/80 bg-gradient-to-b from-background via-muted/20 to-background px-4 py-12 text-foreground transition-colors sm:px-6 lg:px-10 lg:py-16 dark:bg-background"
    >
      <div id="marketplace" className="sr-only" />
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-b from-zinc-100 to-zinc-200/60 text-zinc-900 shadow-xs dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 dark:text-zinc-100">
              <Package className="size-5" />
            </div>
            <div>
              <span className="block text-[11px] font-black tracking-widest text-muted-foreground uppercase">
                BUNDLE &amp; SAVE
              </span>
              <h2
                id="bundles-heading"
                className="text-2xl font-black tracking-tight text-foreground sm:text-3xl"
              >
                Featured Course Bundles
              </h2>
            </div>
          </div>

          {/* Right Controls: View Switcher & "All ->" */}
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
              to={"/bundles" as any}
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
                key={`bundle-skel-${idx}`}
                className="overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-xs"
              >
                <Skeleton className="aspect-[16/10] w-full rounded-none" />
                <div className="space-y-3 p-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="h-3.5 w-16" />
                  </div>
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bundles Catalog */}
        {!isLoading && bundles.length > 0 && (
          <div
            className={cn(
              "mt-8 grid gap-5",
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
                    "group relative flex overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-lg dark:hover:border-zinc-700",
                    viewMode === "list" ? "flex-col sm:flex-row" : "flex-col"
                  )}
                >
                  {/* Thumbnail Image */}
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
                      alt={bundle.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top-Left Badge */}
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md border border-white/40 bg-white/95 px-2 py-0.5 text-[10px] font-black tracking-wide text-zinc-900 uppercase shadow-xs backdrop-blur-xs dark:border-white/20 dark:bg-black/85 dark:text-white">
                      <Sparkles className="size-2.5" />
                      <span>Course Bundle</span>
                    </span>

                    {/* Discount Badge */}
                    {discountPercent > 0 && (
                      <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1 rounded-md border border-zinc-700/50 bg-zinc-950 px-2 py-0.5 text-[10px] font-black tracking-wider text-white uppercase shadow-md dark:border-zinc-300/50 dark:bg-white dark:text-zinc-950">
                        <Tag className="size-2.5" />
                        <span>{discountPercent.toFixed(0)}% OFF</span>
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col p-4">
                    {/* Courses Count Meta */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                        <Package className="size-3.5" />
                        <span>
                          {courses.length} course
                          {courses.length === 1 ? "" : "s"}
                        </span>
                      </span>
                      <span className="text-base font-black text-foreground">
                        {formatPrice(finalFee, bundle.currency)}
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
                      title={bundle.name}
                    >
                      {bundle.name}
                    </h3>

                    {/* Description */}
                    {desc && (
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {desc}
                      </p>
                    )}

                    {/* Footer Row */}
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/50 pt-4">
                      {combinedValue > finalFee ? (
                        <span className="text-xs font-bold text-muted-foreground line-through">
                          {formatPrice(combinedValue, bundle.currency)}
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-muted-foreground">
                          All-in-one pack
                        </span>
                      )}

                      <Link
                        to={`/bundles/${bundle.id}` as any}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-gradient-to-b from-zinc-100 to-zinc-200/80 px-3 py-1.5 text-xs font-bold text-zinc-900 shadow-2xs transition-all hover:bg-zinc-900 hover:text-white dark:border-zinc-700 dark:bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-100 dark:hover:bg-white dark:hover:text-zinc-950"
                      >
                        <span>View bundle</span>
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
