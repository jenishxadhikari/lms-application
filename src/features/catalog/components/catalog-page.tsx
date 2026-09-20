import { useMemo, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Clock,
  Eye,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
  Star,
  Users,
  X,
} from "lucide-react"

import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { FloatingThemeCustomizer } from "@/components/floating-theme-customizer"
import { HomeSidebar } from "@/components/sidebar/home-sidebar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export type CatalogKind = "workshops" | "mentorships" | "blogs" | "marketplace"

interface CatalogItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  price?: number
  currency?: string
  date?: string
  duration?: string
  author?: string
  rating?: number
  popularity: number
  badge: string
  href: string
  cta: string
  statsLabel?: string
}

interface RawRecord {
  [key: string]: any
}

const MARKETPLACE_ITEMS: CatalogItem[] = [
  {
    id: "market-1",
    title: "Production-Ready React Dashboard Kit",
    description:
      "A responsive dashboard starter with accessible components, charts, tables, auth screens, and dark mode.",
    image: "/creators/team-01.webp",
    category: "UI Kits",
    price: 2499,
    currency: "NPR",
    author: "NepaliMentor Studio",
    rating: 4.9,
    popularity: 1280,
    badge: "BESTSELLER",
    href: "/sign-up",
    cta: "View product",
    statsLabel: "1,280 downloads",
  },
  {
    id: "market-2",
    title: "Figma Design System Starter",
    description:
      "Tokens, variants, responsive grids, and documented components for building polished product interfaces faster.",
    image: "/creators/team-02.webp",
    category: "Design Assets",
    price: 1799,
    currency: "NPR",
    author: "Prashant Rai",
    rating: 4.8,
    popularity: 940,
    badge: "POPULAR",
    href: "/sign-up",
    cta: "View product",
    statsLabel: "940 downloads",
  },
  {
    id: "market-3",
    title: "Full-Stack SaaS Boilerplate",
    description:
      "Launch-ready authentication, billing, team workspaces, email flows, and a clean TypeScript architecture.",
    image: "/creators/team-03.webp",
    category: "Code Templates",
    price: 4999,
    currency: "NPR",
    author: "Avyukt Media",
    rating: 4.95,
    popularity: 715,
    badge: "NEW",
    href: "/sign-up",
    cta: "View product",
    statsLabel: "715 downloads",
  },
  {
    id: "market-4",
    title: "Creator Portfolio Template Pack",
    description:
      "Four refined portfolio layouts for designers, developers, filmmakers, and independent creators.",
    image: "/creators/team-04.webp",
    category: "Templates",
    price: 0,
    currency: "NPR",
    author: "NepaliMentor Community",
    rating: 4.7,
    popularity: 2160,
    badge: "FREE",
    href: "/sign-up",
    cta: "Get template",
    statsLabel: "2,160 downloads",
  },
  {
    id: "market-5",
    title: "3D Product Mockup Collection",
    description:
      "Editable Blender scenes with studio lighting, materials, cameras, and export presets for product showcases.",
    image: "/creators/team-5-img-2.webp",
    category: "3D Assets",
    price: 2999,
    currency: "NPR",
    author: "Creative Studio",
    rating: 4.85,
    popularity: 530,
    badge: "CURATED",
    href: "/sign-up",
    cta: "View product",
    statsLabel: "530 downloads",
  },
  {
    id: "market-6",
    title: "Technical Interview Workbook",
    description:
      "A practical workbook covering algorithms, system design prompts, frontend scenarios, and answer frameworks.",
    image: "/creators/team-5-img-3.webp",
    category: "E-books",
    price: 899,
    currency: "NPR",
    author: "NepaliMentor Career Lab",
    rating: 4.75,
    popularity: 1185,
    badge: "TOP RATED",
    href: "/sign-up",
    cta: "View product",
    statsLabel: "1,185 downloads",
  },
]

const CATALOG_META = {
  workshops: {
    catalogTitle: "Live Workshops",
    endpoint: "/public/workshops?page=0&size=100",
    emptyTitle: "No workshops are scheduled",
    emptyDescription:
      "New live workshops will appear here as soon as they are published.",
  },
  mentorships: {
    catalogTitle: "Expert Mentorship",
    endpoint: "/public/mentorships?page=0&size=100",
    emptyTitle: "No mentorship slots are open",
    emptyDescription:
      "New mentor availability will appear here as soon as it is published.",
  },
  blogs: {
    catalogTitle: "All Articles",
    endpoint: "/public/blogs?page=0&size=100",
    emptyTitle: "No articles are published",
    emptyDescription:
      "Fresh learning stories and insights will appear here soon.",
  },
  marketplace: {
    catalogTitle: "Creator Marketplace",
    endpoint: null,
    emptyTitle: "No products found",
    emptyDescription: "Try choosing another product category.",
  },
} satisfies Record<CatalogKind, Record<string, string | null>>

function stripHtml(value = "") {
  return value.replace(/<[^>]*>?/gm, "").trim()
}

function extractRecords(data: any, kind: CatalogKind): RawRecord[] {
  if (Array.isArray(data)) return data
  const keys = kind === "mentorships" ? ["mentorships", "workshops"] : [kind]
  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key]
    if (Array.isArray(data?.data?.[key])) return data.data[key]
  }
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.content)) return data.content
  return []
}

function mentorName(record: RawRecord) {
  return (
    record.mentorName ||
    record.mentor?.fullName ||
    [record.mentor?.firstName, record.mentor?.lastName]
      .filter(Boolean)
      .join(" ") ||
    record.instructorName ||
    "NepaliMentor Expert"
  )
}

function normalizeRecord(record: RawRecord, kind: CatalogKind): CatalogItem {
  const isBlog = kind === "blogs"
  const image =
    record.coverImageUrl ||
    record.coverImage ||
    record.thumbnailUrl ||
    record.thumbnail ||
    record.imageUrl ||
    (isBlog ? "/creators/team-01.webp" : "/creators/team-02.webp")
  const category =
    record.category?.name ||
    record.categoryName ||
    record.category ||
    (kind === "workshops"
      ? "Live Workshop"
      : kind === "mentorships"
        ? "1-on-1 Mentorship"
        : "Learning")
  const publishedDate =
    record.publishedAt || record.createdDatetime || record.createdAt
  const sessionCount = Array.isArray(record.sessions)
    ? record.sessions.length
    : record.sessionsCount
  const duration = isBlog
    ? `${
        record.readingTimeMinutes ||
        Math.max(
          1,
          Math.ceil(
            stripHtml(record.content || "")
              .split(/\s+/)
              .filter(Boolean).length / 200
          )
        ) ||
        4
      } min read`
    : kind === "workshops"
      ? `${record.durationDays || 1} day${(record.durationDays || 1) === 1 ? "" : "s"}`
      : `${sessionCount || 1} live session${(sessionCount || 1) === 1 ? "" : "s"}`

  return {
    id: String(record.id),
    title:
      record.title?.trim() ||
      (isBlog ? "Untitled article" : "Untitled program"),
    description: stripHtml(
      record.summary ||
        record.description ||
        record.brief ||
        record.subtitle ||
        ""
    ),
    image,
    category: String(category),
    price: isBlog ? undefined : (record.entryFee ?? record.price ?? record.fee),
    currency: record.currency,
    date: isBlog ? publishedDate : record.startDate,
    duration,
    author: isBlog
      ? record.authorName || record.author?.fullName || "NepaliMentor"
      : mentorName(record),
    rating: record.avgRating ?? record.rating,
    popularity:
      record.viewCount ?? record.enrolledCount ?? record.bookingsCount ?? 0,
    badge: isBlog ? "BLOG" : kind === "workshops" ? "WORKSHOP" : "MENTORSHIP",
    href: isBlog
      ? `/blogs/${record.slug || record.id}`
      : kind === "workshops"
        ? `/workshops/${record.id}`
        : `/mentorships/${record.id}`,
    cta: isBlog
      ? "Read article"
      : kind === "workshops"
        ? "Join workshop"
        : "Book session",
    statsLabel: isBlog ? `${record.viewCount ?? 0} views` : undefined,
  }
}

function formatDate(value?: string) {
  if (!value) return "Upcoming"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Upcoming"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatPrice(price?: number, currency?: string) {
  if (!price) return "Free"
  const prefix =
    !currency || ["npr", "rs", "rs."].includes(currency.toLowerCase())
      ? "Rs."
      : currency.toUpperCase()
  return `${prefix} ${price.toLocaleString()}`
}

export function CatalogRoutePage({ kind }: { kind: CatalogKind }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <HomeSidebar />
      <SidebarInset className="!m-0 min-h-svh min-w-0">
        <SiteHeader />
        <CatalogPage kind={kind} />
        <SiteFooter />
        <FloatingThemeCustomizer />
      </SidebarInset>
    </SidebarProvider>
  )
}

function CatalogPage({ kind }: { kind: CatalogKind }) {
  const meta = CATALOG_META[kind]
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState<
    "popular" | "newest" | "price-asc" | "price-desc"
  >("popular")

  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery<CatalogItem[]>({
    queryKey: ["public-dedicated-catalog", kind],
    queryFn: async () => {
      if (kind === "marketplace") return MARKETPLACE_ITEMS
      const response = await api.get(meta.endpoint as string)
      return extractRecords(response.data, kind).map((record) =>
        normalizeRecord(record, kind)
      )
    },
    staleTime: 1000 * 60 * 5,
  })

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))).sort(),
    [items]
  )
  const filteredItems = useMemo(() => {
    return items
      .filter(
        (item) =>
          selectedCategory === "all" || item.category === selectedCategory
      )
      .sort((a, b) => {
        if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0)
        if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0)
        if (sortBy === "newest")
          return (
            new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
          )
        return b.popularity - a.popularity
      })
  }, [items, selectedCategory, sortBy])

  const itemLabel =
    kind === "blogs" ? "articles" : kind === "marketplace" ? "products" : kind
  const visibleItemLabel =
    filteredItems.length === 1
      ? itemLabel === "articles"
        ? "article"
        : itemLabel === "products"
          ? "product"
          : itemLabel.slice(0, -1)
      : itemLabel
  const clearFilters = () => {
    setSelectedCategory("all")
    setSortBy("popular")
  }

  return (
    <main className="min-h-[70svh] bg-background">
      <section className="px-4 pt-6 pb-14 sm:px-6 lg:px-10 lg:pt-8 lg:pb-18">
        <div className="mx-auto w-full max-w-7xl">
          {categories.length > 0 && (
            <div className="flex [scrollbar-width:none] items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {["all", ...categories].map((category) => {
                const active = selectedCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                      active
                        ? "bg-zinc-950 text-white shadow-xs dark:bg-white dark:text-zinc-950"
                        : "border border-border/80 bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                    )}
                  >
                    {category === "all" ? "All Topics" : category}
                  </button>
                )
              })}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              {meta.catalogTitle}
            </h2>
            <div className="flex shrink-0 items-center gap-2">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as typeof sortBy)
                  }
                  className="h-8.5 appearance-none rounded-full border border-border/80 bg-background pr-7 pl-3 text-xs font-medium text-foreground hover:border-foreground/40 focus:outline-none"
                >
                  <option value="popular">Sort: Most Popular</option>
                  <option value="newest">Sort: Newest First</option>
                  {kind !== "blogs" && (
                    <option value="price-asc">Sort: Price (Low-High)</option>
                  )}
                  {kind !== "blogs" && (
                    <option value="price-desc">Sort: Price (High-Low)</option>
                  )}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="flex h-8.5 items-center rounded-full border border-border/80 bg-background p-0.5 shadow-2xs">
                {(["grid", "list"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    aria-label={`${mode} view`}
                    className={cn(
                      "flex size-7 items-center justify-center rounded-full transition-colors",
                      viewMode === mode
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {mode === "grid" ? (
                      <LayoutGrid className="size-3.5" />
                    ) : (
                      <List className="size-3.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 flex min-h-8 flex-wrap items-center gap-1.5 border-b border-border/50 pb-3 text-xs text-muted-foreground">
            <span>
              Showing{" "}
              <strong className="text-foreground">
                {filteredItems.length}
              </strong>{" "}
              {visibleItemLabel}
            </span>
            {selectedCategory !== "all" && (
              <>
                <span>&bull;</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/50 px-2 py-0.5 text-[11px] text-foreground">
                  {selectedCategory}
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    aria-label="Remove category filter"
                  >
                    <X className="size-2.5" />
                  </button>
                </span>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-1 font-bold text-foreground underline hover:no-underline"
                >
                  <RotateCcw className="size-2.5" /> Reset all
                </button>
              </>
            )}
          </div>

          {isLoading && (
            <div
              className={cn(
                "mt-6 grid gap-5",
                viewMode === "grid"
                  ? "grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 lg:grid-cols-2"
              )}
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "overflow-hidden rounded-xl border border-border/80 bg-card p-3",
                    viewMode === "list" &&
                      "flex flex-col gap-3 sm:flex-row sm:gap-4"
                  )}
                >
                  <Skeleton
                    className={cn(
                      "aspect-[16/10] rounded-lg",
                      viewMode === "list"
                        ? "w-full sm:w-48 sm:shrink-0"
                        : "w-full"
                    )}
                  />
                  <div className="flex-1 space-y-3 py-1">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-3 w-3/5" />
                    <Skeleton className="h-7 w-24" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && (isError || filteredItems.length === 0) && (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Search className="size-6" />
              </div>
              <h3 className="mt-3 text-base font-bold text-foreground">
                {isError ? `Unable to load ${itemLabel}` : meta.emptyTitle}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {isError
                  ? "Please try again in a moment."
                  : meta.emptyDescription}
              </p>
              {selectedCategory !== "all" && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 rounded-lg border border-border bg-card px-4 py-2 text-xs font-bold"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {!isLoading && !isError && filteredItems.length > 0 && (
            <div
              className={cn(
                "mt-6 grid gap-5",
                viewMode === "grid"
                  ? "grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 lg:grid-cols-2"
              )}
            >
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className={cn(
                    "group flex overflow-hidden rounded-xl border border-border/80 bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg",
                    viewMode === "list"
                      ? "flex-col sm:min-h-52 sm:flex-row"
                      : "flex-col"
                  )}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden bg-muted",
                      viewMode === "list"
                        ? "aspect-[16/10] w-full sm:aspect-auto sm:w-52 sm:shrink-0"
                        : "aspect-[16/10]"
                    )}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 rounded-md border border-white/40 bg-white/95 px-2 py-0.5 text-[10px] font-black tracking-wide text-zinc-900 uppercase shadow-xs">
                      {item.category}
                    </span>
                    <span
                      className={cn(
                        "absolute right-2.5 bottom-2.5 rounded-md bg-zinc-950 px-2 py-0.5 text-[10px] font-black tracking-wider text-white uppercase shadow-md dark:bg-white dark:text-zinc-950",
                        viewMode === "grid" &&
                          "max-[399px]:right-1.5 max-[399px]:bottom-1.5 max-[399px]:px-1.5 max-[399px]:text-[8px]"
                      )}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "flex min-w-0 flex-1 flex-col",
                      viewMode === "list" ? "p-3.5" : "p-2.5 sm:p-3.5"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                      <span className="inline-flex min-w-0 items-center gap-1.5">
                        <Users className="size-3.5 shrink-0" />
                        <span className="truncate">{item.author}</span>
                      </span>
                      {item.date && (
                        <span
                          className={cn(
                            "shrink-0 items-center gap-1",
                            viewMode === "list"
                              ? "inline-flex"
                              : "hidden sm:inline-flex"
                          )}
                        >
                          <Calendar className="size-3.5" />
                          {formatDate(item.date)}
                        </span>
                      )}
                    </div>
                    <h3
                      className={cn(
                        "mt-2.5 line-clamp-2 leading-snug font-bold text-foreground",
                        viewMode === "grid"
                          ? "text-xs sm:text-[15px]"
                          : "text-[15px]"
                      )}
                      title={item.title}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p
                        className={cn(
                          "mt-1.5 text-xs leading-relaxed text-muted-foreground",
                          viewMode === "list"
                            ? "line-clamp-2"
                            : "line-clamp-2 max-[399px]:hidden"
                        )}
                      >
                        {item.description}
                      </p>
                    )}
                    <div
                      className={cn(
                        "mt-3 flex flex-wrap items-center text-[11px] text-muted-foreground",
                        viewMode === "grid" ? "gap-1 sm:gap-2" : "gap-2"
                      )}
                    >
                      {item.duration && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                          <Clock className="size-3" />
                          {item.duration}
                        </span>
                      )}
                      {item.rating && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                          <Star className="size-3 fill-current" />
                          {item.rating.toFixed(1)}
                        </span>
                      )}
                      {item.statsLabel && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                          <Eye className="size-3" />
                          {item.statsLabel}
                        </span>
                      )}
                    </div>
                    <div
                      className={cn(
                        "mt-auto flex items-center justify-between pt-4",
                        "gap-3"
                      )}
                    >
                      <span
                        className={cn(
                          "font-black text-foreground",
                          viewMode === "list"
                            ? "text-base"
                            : "text-xs sm:text-base"
                        )}
                      >
                        {kind === "blogs"
                          ? item.category
                          : formatPrice(item.price, item.currency)}
                      </span>
                      <Link
                        to={item.href as any}
                        aria-label={item.cta}
                        className={cn(
                          "inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-xs font-bold text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background",
                          viewMode === "list"
                            ? "gap-1.5 px-3 py-1.5"
                            : "size-8 gap-0 px-0 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
                        )}
                      >
                        <span
                          className={cn(
                            viewMode === "grid" && "max-sm:sr-only"
                          )}
                        >
                          {item.cta}
                        </span>
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
