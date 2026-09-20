import { useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import {
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  LayoutGrid,
  List,
  Newspaper,
} from "lucide-react"

import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

import { Skeleton } from "@/components/ui/skeleton"

export interface BlogItem {
  id: string
  title: string
  slug?: string
  summary?: string
  content?: string
  coverImageUrl?: string
  coverImage?: string
  categoryName?: string
  category?: {
    id?: string
    name?: string
    slug?: string
  }
  publishedAt?: string | null
  createdDatetime?: string
  createdAt?: string
  viewCount?: number
  authorName?: string
  readingTimeMinutes?: number
}

function stripHtml(html: string = ""): string {
  return html.replace(/<[^>]*>?/gm, "").trim()
}

function formatBlogDate(value?: string | null): string {
  if (!value) return "Recently published"
  try {
    const d = new Date(value)
    if (isNaN(d.getTime())) return "Recently published"
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return "Recently published"
  }
}

function calculateReadingTime(content?: string, fallback?: number): number {
  if (fallback && fallback > 0) return fallback
  if (!content) return 4
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

const SAMPLE_BLOGS: BlogItem[] = [
  {
    id: "blog-1",
    title: "Mastering Modern Design Systems: Building Scalable UI from Scratch",
    summary:
      "A deep dive into crafting resilient design tokens, composable component primitives, and accessible interaction patterns for modern web apps.",
    coverImageUrl: "/creators/team-01.webp",
    categoryName: "Design & Dev",
    publishedAt: "2026-09-18T10:00:00Z",
    readingTimeMinutes: 5,
    viewCount: 420,
    authorName: "Nepali Mentor",
  },
  {
    id: "blog-2",
    title: "The Roadmap to Becoming a Senior Frontend Engineer in 2026",
    summary:
      "Essential technical skills, architecture principles, performance profiling, and leadership traits that help developers level up.",
    coverImageUrl: "/creators/team-02.webp",
    categoryName: "Career Growth",
    publishedAt: "2026-09-14T08:30:00Z",
    readingTimeMinutes: 7,
    viewCount: 680,
    authorName: "Avyukt Media",
  },
  {
    id: "blog-3",
    title: "Demystifying 3D Character Modeling and Topological Cleanliness",
    summary:
      "Practical tips for creating edge loops that deform seamlessly in character animation, blending artistic anatomy with technical constraints.",
    coverImageUrl: "/creators/team-03.webp",
    categoryName: "3D Animation",
    publishedAt: "2026-09-10T14:15:00Z",
    readingTimeMinutes: 6,
    viewCount: 310,
    authorName: "Sameer Lama",
  },
  {
    id: "blog-4",
    title: "Why Mentorship Accelerates Practical Learning 10x Faster",
    summary:
      "How personalized code reviews, real-time debugging, and direct industry feedback shorten the bridge between theory and production mastery.",
    coverImageUrl: "/creators/team-04.webp",
    categoryName: "Mentorship",
    publishedAt: "2026-09-05T12:00:00Z",
    readingTimeMinutes: 4,
    viewCount: 540,
    authorName: "Nepali Mentor",
  },
]

export function BlogsSection() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const { data: blogs = [], isLoading } = useQuery<BlogItem[]>({
    queryKey: ["public-blogs-list"],
    queryFn: async () => {
      try {
        const res = await api.get<{ blogs?: BlogItem[] }>(
          "/public/blogs?page=0&size=8"
        )
        const d = res.data as any
        let list: BlogItem[] = []
        if (Array.isArray(d)) list = d
        else if (Array.isArray(d?.blogs)) list = d.blogs
        else if (Array.isArray(d?.data?.blogs)) list = d.data.blogs
        else if (Array.isArray(d?.data)) list = d.data
        else if (Array.isArray(d?.content)) list = d.content

        if (list.length > 0) {
          return list
        }
        return SAMPLE_BLOGS
      } catch (err) {
        console.warn("Failed to load public blogs, using sample articles:", err)
        return SAMPLE_BLOGS
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  return (
    <section
      id="blogs"
      aria-labelledby="blogs-heading"
      className="relative scroll-mt-4 border-t border-border/80 bg-gradient-to-b from-background via-muted/20 to-background px-4 py-10 text-foreground transition-colors sm:px-6 sm:py-12 lg:px-10 lg:py-16 dark:bg-background"
    >
      <div id="blog" className="sr-only" />
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-b from-zinc-100 to-zinc-200/60 text-zinc-900 shadow-xs dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 dark:text-zinc-100">
              <Newspaper className="size-5" />
            </div>
            <div>
              <span className="block text-[11px] font-black tracking-widest text-muted-foreground uppercase">
                ARTICLES &amp; INSIGHTS
              </span>
              <h2
                id="blogs-heading"
                className="text-2xl font-black tracking-tight text-foreground sm:text-3xl"
              >
                Latest Blogs
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
              to={"/blogs" as any}
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
                key={`blog-skeleton-${idx}`}
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
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blog Cards Grid / List */}
        {!isLoading && blogs.length > 0 && (
          <div
            className={cn(
              "mt-8 grid gap-5",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 lg:grid-cols-2"
            )}
          >
            {blogs.map((blog) => {
              const image =
                blog.coverImageUrl ||
                blog.coverImage ||
                "/creators/team-01.webp"

              const categoryName =
                blog.category?.name || blog.categoryName || "Learning"

              const dateStr =
                blog.publishedAt || blog.createdDatetime || blog.createdAt

              const readingTime = calculateReadingTime(
                blog.content,
                blog.readingTimeMinutes
              )

              const cleanSummary = stripHtml(blog.summary || "")

              return (
                <article
                  key={blog.id}
                  className={cn(
                    "group relative flex overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-lg dark:hover:border-zinc-700",
                    viewMode === "list"
                      ? "flex-col sm:h-50 sm:flex-row"
                      : "flex-col"
                  )}
                >
                  {/* Image Container */}
                  <div
                    className={cn(
                      "relative overflow-hidden bg-muted",
                      viewMode === "list"
                        ? "aspect-[16/10] w-full sm:aspect-auto sm:h-full sm:w-56 sm:shrink-0"
                        : "aspect-[16/10] w-full"
                    )}
                  >
                    <img
                      src={image}
                      alt={blog.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top-Left Category Badge */}
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center rounded-md border border-white/40 bg-white/95 px-2 py-0.5 text-[10px] font-black tracking-wide text-zinc-900 uppercase shadow-xs backdrop-blur-xs dark:border-white/20 dark:bg-black/85 dark:text-white">
                      {categoryName}
                    </span>

                    {/* Bottom-Right Badge */}
                    <span className="absolute right-2.5 bottom-2.5 inline-flex items-center rounded-md border border-zinc-700/50 bg-zinc-950 px-2 py-0.5 text-[10px] font-black tracking-wider text-white uppercase shadow-md dark:border-zinc-300/50 dark:bg-white dark:text-zinc-950">
                      BLOG
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                    {/* Meta Row: Date & Reading Time */}
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Calendar className="size-3.5 shrink-0 text-muted-foreground/80" />
                        <span className="truncate">
                          {formatBlogDate(dateStr)}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Clock className="size-3.5 shrink-0 text-muted-foreground/80" />
                        <span>{readingTime} min read</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={cn(
                        "mt-2.5 leading-snug font-bold text-foreground transition-colors group-hover:text-foreground/80",
                        viewMode === "list"
                          ? "line-clamp-2 text-sm sm:text-base"
                          : "line-clamp-2 min-h-[2.85rem] text-[15px]"
                      )}
                      title={blog.title}
                    >
                      {blog.title}
                    </h3>

                    {/* Summary */}
                    {cleanSummary && (
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {cleanSummary}
                      </p>
                    )}

                    {/* Footer Row: View Count & Action */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Eye className="size-3.5 shrink-0" />
                        <span>{blog.viewCount ?? 0} views</span>
                      </span>

                      <Link
                        to={`/blogs/${blog.id}` as any}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300/80 bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-900 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white hover:shadow-sm active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-white dark:hover:bg-white dark:hover:text-zinc-950"
                      >
                        <span>Read article</span>
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
