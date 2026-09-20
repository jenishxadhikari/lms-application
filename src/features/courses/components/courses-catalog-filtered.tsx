import { useMemo, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
  Star,
  X,
} from "lucide-react"

import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

import { Skeleton } from "@/components/ui/skeleton"

export interface CourseItem {
  id: string
  title: string
  subtitle?: string
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
  enrolledCount?: number
  category?: string
  categories?: { id: string; name: string }[]
  instructorName?: string
}

const FALLBACK_COURSES: CourseItem[] = [
  {
    id: "c-1",
    title: "Cinematic Film & Visual Storytelling",
    subtitle:
      "Master composition, lighting, and narrative editing from industry leading cinematographers.",
    level: "BEGINNER",
    language: "English",
    price: 2999,
    currency: "Rs.",
    thumbnailUrl: "/creators/team-01.webp",
    lectureCount: 32,
    totalDurationSeconds: 59400,
    avgRating: 4.95,
    reviewCount: 320,
    enrolledCount: 4210,
    category: "Filmmaking & Media",
    instructorName: "Aayush Sharma",
  },
  {
    id: "c-2",
    title: "Production Full-Stack & Microservices Architecture",
    subtitle:
      "Build scalable event-driven backends with Go, PostgreSQL, Docker, Redis, and React.",
    level: "INTERMEDIATE",
    language: "English",
    price: 3499,
    currency: "Rs.",
    thumbnailUrl: "/creators/team-03.webp",
    lectureCount: 48,
    totalDurationSeconds: 86400,
    avgRating: 4.98,
    reviewCount: 490,
    enrolledCount: 5640,
    category: "Software Engineering",
    instructorName: "Avyukt Media",
  },
  {
    id: "c-3",
    title: "Design Systems & High-Craft Figma Interfaces",
    subtitle:
      "Design scalable token-driven design systems, component architecture, and interaction states.",
    level: "BEGINNER",
    language: "English",
    price: 2499,
    currency: "Rs.",
    thumbnailUrl: "/creators/team-02.webp",
    lectureCount: 26,
    totalDurationSeconds: 43200,
    avgRating: 4.92,
    reviewCount: 210,
    enrolledCount: 3180,
    category: "UI/UX Design",
    instructorName: "Prashant Rai",
  },
  {
    id: "c-4",
    title: "Python Programming - Beginner to Expert",
    subtitle:
      "From basic logic to algorithms, automation, data science fundamentals, and clean code practices.",
    level: "BEGINNER",
    language: "English",
    price: 0,
    currency: "Rs.",
    thumbnailUrl: "/creators/team-04.webp",
    lectureCount: 24,
    totalDurationSeconds: 36000,
    avgRating: 4.88,
    reviewCount: 410,
    enrolledCount: 8920,
    category: "Programming",
    instructorName: "Anjali Thapa",
  },
  {
    id: "c-5",
    title: "Microsoft Office - All in One Package",
    subtitle:
      "Master Microsoft Word, Excel, PowerPoint, and Outlook for professional workplace efficiency.",
    level: "BEGINNER",
    language: "Nepali",
    price: 0,
    currency: "Rs.",
    thumbnailUrl: "/creators/team-5-img-1.webp",
    lectureCount: 18,
    totalDurationSeconds: 28800,
    avgRating: 4.85,
    reviewCount: 180,
    enrolledCount: 6240,
    category: "Productivity",
    instructorName: "NepaliMentor Lead",
  },
  {
    id: "c-6",
    title: "3D Character Topology & Motion Rigging",
    subtitle:
      "Create clean topology, anatomical deformations, and industry-grade rigging in Blender.",
    level: "INTERMEDIATE",
    language: "English",
    price: 3299,
    currency: "Rs.",
    thumbnailUrl: "/creators/team-5-img-2.webp",
    lectureCount: 38,
    totalDurationSeconds: 64800,
    avgRating: 4.94,
    reviewCount: 154,
    enrolledCount: 2410,
    category: "3D & Animation",
    instructorName: "Creative Studio",
  },
  {
    id: "c-7",
    title: "Cloud Native DevOps & Kubernetes Deployment",
    subtitle:
      "Deploy scalable clusters, configure CI/CD pipelines, Terraform infrastructure, and monitoring.",
    level: "ADVANCED",
    language: "English",
    price: 3899,
    currency: "Rs.",
    thumbnailUrl: "/creators/team-5-img-3.webp",
    lectureCount: 42,
    totalDurationSeconds: 72000,
    avgRating: 4.96,
    reviewCount: 280,
    enrolledCount: 2190,
    category: "DevOps & Cloud",
    instructorName: "Staff DevOps Lead",
  },
  {
    id: "c-8",
    title: "Web Performance & Modern React 19 Architecture",
    subtitle:
      "Deep dive into Server Components, compiler optimizations, streaming SSR, and edge deployments.",
    level: "ADVANCED",
    language: "Nepali",
    price: 2799,
    currency: "Rs.",
    thumbnailUrl: "/creators/team-02.webp",
    lectureCount: 30,
    totalDurationSeconds: 50400,
    avgRating: 4.91,
    reviewCount: 195,
    enrolledCount: 1980,
    category: "Software Engineering",
    instructorName: "Anjali Thapa",
  },
]

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

function formatPrice(price?: number | string | null, currency = "Rs."): string {
  if (price === 0 || price === "0" || !price) return "Free"
  if (typeof price === "number") {
    return `${currency} ${price.toLocaleString()}`
  }
  return String(price)
}

export function CoursesCatalogFiltered() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filters State matching Old UI
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [sortBy, setSortBy] = useState<
    "popular" | "rating" | "newest" | "price-asc" | "price-desc"
  >("popular")

  // API Query
  const { data: apiCourses = [], isLoading } = useQuery<CourseItem[]>({
    queryKey: ["catalog-public-courses"],
    queryFn: async () => {
      try {
        const res = await api.get<{ courses?: CourseItem[] }>("/public/courses")
        const d = res.data as any
        let list: CourseItem[] = []
        if (Array.isArray(d)) list = d
        else if (Array.isArray(d?.courses)) list = d.courses
        else if (Array.isArray(d?.data?.courses)) list = d.data.courses
        else if (Array.isArray(d?.data)) list = d.data
        return list
      } catch (err) {
        return []
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  // Combine API with Fallback courses
  const allCourses = useMemo(() => {
    if (apiCourses.length > 0) {
      return apiCourses
    }
    return FALLBACK_COURSES
  }, [apiCourses])

  // Extract Categories & Languages dynamically
  const categories = useMemo(() => {
    const set = new Set<string>()
    allCourses.forEach((c) => {
      if (c.category) set.add(c.category)
      c.categories?.forEach((cat) => {
        if (cat.name) set.add(cat.name)
      })
    })
    return Array.from(set).sort()
  }, [allCourses])

  const languages = useMemo(() => {
    const set = new Set<string>()
    allCourses.forEach((c) => {
      if (c.language) set.add(c.language)
    })
    return Array.from(set).sort()
  }, [allCourses])

  // Filter & Sort Logic
  const filteredCourses = useMemo(() => {
    return allCourses
      .filter((course) => {
        // Search Filter
        if (search.trim()) {
          const query = search.toLowerCase()
          const matchesTitle = course.title?.toLowerCase().includes(query)
          const matchesSubtitle = course.subtitle?.toLowerCase().includes(query)
          const matchesInstructor = course.instructorName
            ?.toLowerCase()
            .includes(query)
          if (!matchesTitle && !matchesSubtitle && !matchesInstructor) {
            return false
          }
        }

        // Category Filter
        if (selectedCategory !== "all") {
          const courseCat = course.category?.toLowerCase() || ""
          const hasCat = course.categories?.some(
            (c) => c.name.toLowerCase() === selectedCategory.toLowerCase()
          )
          if (courseCat !== selectedCategory.toLowerCase() && !hasCat) {
            return false
          }
        }

        // Level Filter
        if (selectedLevel !== "all") {
          if (
            course.level?.toUpperCase() !== selectedLevel.toUpperCase() &&
            course.level !== selectedLevel
          ) {
            return false
          }
        }

        // Language Filter
        if (selectedLanguage !== "all") {
          if (
            course.language?.toLowerCase() !== selectedLanguage.toLowerCase()
          ) {
            return false
          }
        }

        // Price Filter
        if (selectedPrice === "free") {
          const p = Number(course.price || 0)
          if (p > 0) return false
        } else if (selectedPrice === "paid") {
          const p = Number(course.price || 0)
          if (p === 0) return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === "rating") {
          return (b.avgRating || 0) - (a.avgRating || 0)
        }
        if (sortBy === "price-asc") {
          return Number(a.price || 0) - Number(b.price || 0)
        }
        if (sortBy === "price-desc") {
          return Number(b.price || 0) - Number(a.price || 0)
        }
        if (sortBy === "newest") {
          return b.id.localeCompare(a.id)
        }
        // default: popular
        return (b.enrolledCount || 0) - (a.enrolledCount || 0)
      })
  }, [
    allCourses,
    search,
    selectedCategory,
    selectedLevel,
    selectedLanguage,
    selectedPrice,
    sortBy,
  ])

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (search.trim()) count++
    if (selectedCategory !== "all") count++
    if (selectedLevel !== "all") count++
    if (selectedLanguage !== "all") count++
    if (selectedPrice !== "all") count++
    return count
  }, [search, selectedCategory, selectedLevel, selectedLanguage, selectedPrice])

  const clearAllFilters = () => {
    setSearch("")
    setSelectedCategory("all")
    setSelectedLevel("all")
    setSelectedLanguage("all")
    setSelectedPrice("all")
    setSortBy("popular")
  }

  return (
    <section
      id="all-courses"
      className="relative px-4 py-12 sm:px-6 lg:px-10 lg:py-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-zinc-100/90 px-3 py-1 text-[10px] font-bold tracking-widest text-zinc-900 uppercase shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            <BookOpen className="size-3" />
            <span>COMPLETE CURRICULUM</span>
          </div>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            All Courses Catalog
          </h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Explore hands-on programming, system design, and creative
            disciplines.
          </p>
        </div>

        {/* 1. Category Horizontal Pills Bar (Instant 1-Click Filtering) */}
        {categories.length > 0 && (
          <div className="mt-6 flex [scrollbar-width:none] items-center gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                selectedCategory === "all"
                  ? "bg-zinc-950 text-white shadow-xs dark:bg-white dark:text-zinc-950"
                  : "border border-border/80 bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              )}
            >
              All Topics
            </button>
            {categories.map((cat) => {
              const isSelected =
                selectedCategory.toLowerCase() === cat.toLowerCase()
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? "all" : cat)}
                  className={cn(
                    "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                    isSelected
                      ? "bg-zinc-950 text-white shadow-xs dark:bg-white dark:text-zinc-950"
                      : "border border-border/80 bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        )}

        {/* 2. Compact Inline Toolbar (Search + Pill Selects + Sort + View Toggle) */}
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Cluster: Search + Secondary Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative w-full sm:w-64 md:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses or topics..."
                className="h-8.5 w-full rounded-full border border-border/80 bg-background pr-7 pl-8.5 text-xs text-foreground transition-all placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>

            {/* Level Dropdown Pill */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className={cn(
                  "h-8.5 appearance-none rounded-full border border-border/80 bg-background pr-7 pl-3 text-xs font-medium text-foreground transition-all hover:border-foreground/40 focus:border-foreground focus:outline-none",
                  selectedLevel !== "all" &&
                    "border-foreground/60 bg-muted/60 font-semibold"
                )}
              >
                <option value="all">Level: All</option>
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* Language Dropdown Pill */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={cn(
                  "h-8.5 appearance-none rounded-full border border-border/80 bg-background pr-7 pl-3 text-xs font-medium text-foreground transition-all hover:border-foreground/40 focus:border-foreground focus:outline-none",
                  selectedLanguage !== "all" &&
                    "border-foreground/60 bg-muted/60 font-semibold"
                )}
              >
                <option value="all">Language: All</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* Price Dropdown Pill */}
            <div className="relative">
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className={cn(
                  "h-8.5 appearance-none rounded-full border border-border/80 bg-background pr-7 pl-3 text-xs font-medium text-foreground transition-all hover:border-foreground/40 focus:border-foreground focus:outline-none",
                  selectedPrice !== "all" &&
                    "border-foreground/60 bg-muted/60 font-semibold"
                )}
              >
                <option value="all">Price: All</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Right Cluster: Sort By + View Mode Toggle */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-8.5 appearance-none rounded-full border border-border/80 bg-background pr-7 pl-3 text-xs font-medium text-foreground transition-all hover:border-foreground/40 focus:border-foreground focus:outline-none"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="rating">Sort: Highest Rated</option>
                <option value="newest">Sort: Newest First</option>
                <option value="price-asc">Sort: Price (Low-High)</option>
                <option value="price-desc">Sort: Price (High-Low)</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex h-8.5 items-center rounded-full border border-border/80 bg-background p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex size-7 items-center justify-center rounded-full transition-colors",
                  viewMode === "grid"
                    ? "bg-zinc-950 text-white shadow-xs dark:bg-white dark:text-zinc-950"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex size-7 items-center justify-center rounded-full transition-colors",
                  viewMode === "list"
                    ? "bg-zinc-950 text-white shadow-xs dark:bg-white dark:text-zinc-950"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="List view"
              >
                <List className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Streamlined Status & Active Filter Chips Bar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
            <span>
              Showing{" "}
              <strong className="text-foreground">
                {filteredCourses.length}
              </strong>{" "}
              {filteredCourses.length === 1 ? "course" : "courses"}
            </span>

            {activeFiltersCount > 0 && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
                <span className="text-[11px] font-semibold text-muted-foreground">
                  Filtered by:
                </span>

                {search && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/50 px-2 py-0.5 text-[11px] text-foreground">
                    <span>"{search}"</span>
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="hover:text-destructive"
                    >
                      <X className="size-2.5" />
                    </button>
                  </span>
                )}

                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/50 px-2 py-0.5 text-[11px] text-foreground">
                    <span>{selectedCategory}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("all")}
                      className="hover:text-destructive"
                    >
                      <X className="size-2.5" />
                    </button>
                  </span>
                )}

                {selectedLevel !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/50 px-2 py-0.5 text-[11px] text-foreground">
                    <span>Level: {selectedLevel}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedLevel("all")}
                      className="hover:text-destructive"
                    >
                      <X className="size-2.5" />
                    </button>
                  </span>
                )}

                {selectedLanguage !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/50 px-2 py-0.5 text-[11px] text-foreground">
                    <span>Language: {selectedLanguage}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedLanguage("all")}
                      className="hover:text-destructive"
                    >
                      <X className="size-2.5" />
                    </button>
                  </span>
                )}

                {selectedPrice !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/50 px-2 py-0.5 text-[11px] text-foreground">
                    <span className="capitalize">{selectedPrice}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedPrice("all")}
                      className="hover:text-destructive"
                    >
                      <X className="size-2.5" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold text-foreground underline hover:no-underline"
                >
                  <RotateCcw className="size-2.5" />
                  <span>Reset all</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div
            className={cn(
              "mt-6 grid gap-5",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 lg:grid-cols-2"
            )}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "overflow-hidden rounded-xl border border-border/80 bg-card p-3",
                  viewMode === "list" ? "flex flex-col gap-4 sm:flex-row" : ""
                )}
              >
                <Skeleton
                  className={cn(
                    "rounded-lg",
                    viewMode === "list"
                      ? "aspect-video w-full sm:aspect-[16/10] sm:w-52 sm:shrink-0"
                      : "aspect-video w-full"
                  )}
                />
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div>
                    <Skeleton className="mt-1 h-4 w-3/4" />
                    <Skeleton className="mt-2 h-3 w-1/2" />
                  </div>
                  <div className="mt-4 flex justify-between pt-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-7 w-20 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredCourses.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Search className="size-6" />
            </div>
            <h3 className="mt-3 text-base font-bold text-foreground">
              No courses found
            </h3>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              We couldn't find any courses matching your active search and
              filter criteria.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-xs font-bold text-foreground shadow-2xs hover:bg-muted"
            >
              <RotateCcw className="size-3.5" />
              <span>Clear filters</span>
            </button>
          </div>
        )}

        {/* Course Cards: Grid & List Mode */}
        {!isLoading && filteredCourses.length > 0 && (
          <div
            className={cn(
              "mt-6 grid gap-5",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 lg:grid-cols-2"
            )}
          >
            {filteredCourses.map((course) => {
              const image =
                course.thumbnailUrl ||
                course.coverImageUrl ||
                course.coverImage ||
                "/creators/team-01.webp"

              const level = course.level?.replaceAll("_", " ") || "All Levels"
              const priceFormatted = formatPrice(course.price, course.currency)

              return (
                <article
                  key={course.id}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border border-zinc-200/90 bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800/90 dark:hover:border-zinc-700",
                    viewMode === "list"
                      ? "flex flex-col sm:flex-row sm:items-stretch"
                      : "flex flex-col"
                  )}
                >
                  {/* Thumbnail */}
                  <div
                    className={cn(
                      "relative overflow-hidden bg-muted",
                      viewMode === "list"
                        ? "aspect-video w-full sm:aspect-auto sm:h-auto sm:w-52 sm:shrink-0 md:w-56"
                        : "aspect-video w-full"
                    )}
                  >
                    <img
                      src={image}
                      alt={course.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/creators/team-01.webp"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                    {/* Level Pill */}
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center rounded-full border border-white/20 bg-black/75 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-md">
                      {level}
                    </span>

                    {/* Duration / Lessons */}
                    <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-medium text-white/95 backdrop-blur-xs">
                      <Clock className="size-2.5" />
                      <span>{formatDuration(course.totalDurationSeconds)}</span>
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      {/* Rating & Language Row */}
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-1 font-bold text-foreground">
                          <Star className="size-3.5 fill-current text-zinc-950 dark:text-white" />
                          <span>{(course.avgRating || 5).toFixed(1)}</span>
                          <span className="font-normal text-muted-foreground">
                            ({course.reviewCount || 48})
                          </span>
                        </div>
                        <span className="rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium">
                          {course.language || "English"}
                        </span>
                      </div>

                      {/* Course Title & Subtitle */}
                      <h3 className="mt-2 line-clamp-1 text-sm font-black tracking-tight text-foreground group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                        {course.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {course.subtitle ||
                          "Complete course curriculum with hands-on exercises and downloadable resources."}
                      </p>
                    </div>

                    {/* Card Footer: Price & Solid High-Contrast Action Button */}
                    <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                      <span className="text-base font-black text-foreground">
                        {priceFormatted}
                      </span>

                      <Link
                        to={
                          (course.id
                            ? `/courses/${course.id}`
                            : "/sign-up") as any
                        }
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg border border-zinc-300/80 bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-900 shadow-2xs transition-all",
                          "hover:-translate-y-0.5 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white hover:shadow-sm active:translate-y-0",
                          "dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-white dark:hover:bg-white dark:hover:text-zinc-950"
                        )}
                      >
                        <span>View course</span>
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
