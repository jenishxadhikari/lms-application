import { Link } from "@tanstack/react-router"
import { ArrowRight, Flame, Star } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BestsellerCourse {
  id: string
  title: string
  subtitle: string
  instructor: {
    name: string
    avatarUrl: string
    role: string
  }
  rating: number
  reviewsCount: number
  enrolledCount: number
  price: string
  originalPrice?: string
  totalLessons: string
  duration: string
  badge: string
  thumbnailUrl: string
  level: string
  category: string
}

const BESTSELLER_COURSES: BestsellerCourse[] = [
  {
    id: "course-1",
    title: "Cinematic Film & Visual Storytelling",
    subtitle:
      "Master camera composition, cinematic lighting, and color grading from award-winning filmmakers.",
    instructor: {
      name: "Aayush Sharma",
      avatarUrl: "/creators/team-01.webp",
      role: "Lead Cinematographer",
    },
    rating: 4.95,
    reviewsCount: 1240,
    enrolledCount: 4210,
    price: "Rs. 2,999",
    originalPrice: "Rs. 4,999",
    totalLessons: "32 Lessons",
    duration: "16.5 Hours",
    badge: "Top Bestseller",
    thumbnailUrl: "/creators/team-01.webp",
    level: "All Levels",
    category: "Media & Filmmaking",
  },
  {
    id: "course-2",
    title: "Production Full-Stack & Microservices Architecture",
    subtitle:
      "Build distributed event-driven systems using Go, Node.js, PostgreSQL, Docker, and Redis.",
    instructor: {
      name: "Avyukt Media",
      avatarUrl: "/creators/team-03.webp",
      role: "Staff Systems Architect",
    },
    rating: 4.98,
    reviewsCount: 1890,
    enrolledCount: 5640,
    price: "Rs. 3,499",
    originalPrice: "Rs. 5,999",
    totalLessons: "44 Lessons",
    duration: "24.0 Hours",
    badge: "Career Track",
    thumbnailUrl: "/creators/team-03.webp",
    level: "Intermediate",
    category: "Software Engineering",
  },
  {
    id: "course-3",
    title: "Design Systems & High-Craft Figma Interfaces",
    subtitle:
      "Architect production design tokens, scalable component libraries, and interactive design systems.",
    instructor: {
      name: "Prashant Rai",
      avatarUrl: "/creators/team-02.webp",
      role: "Staff Product Designer",
    },
    rating: 4.92,
    reviewsCount: 980,
    enrolledCount: 3180,
    price: "Rs. 2,499",
    originalPrice: "Rs. 3,999",
    totalLessons: "26 Lessons",
    duration: "12.0 Hours",
    badge: "Trending Now",
    thumbnailUrl: "/creators/team-02.webp",
    level: "Beginner to Pro",
    category: "UI/UX Design",
  },
  {
    id: "course-4",
    title: "Modern React & TypeScript Engineering",
    subtitle:
      "Build reliable frontend applications with React, TypeScript, testing, performance, and scalable architecture.",
    instructor: {
      name: "Nischal Karki",
      avatarUrl: "/creators/team-04.webp",
      role: "Senior Frontend Engineer",
    },
    rating: 4.96,
    reviewsCount: 1460,
    enrolledCount: 4870,
    price: "Rs. 2,999",
    originalPrice: "Rs. 4,499",
    totalLessons: "38 Lessons",
    duration: "18.5 Hours",
    badge: "Student Favorite",
    thumbnailUrl: "/creators/team-04.webp",
    level: "Intermediate",
    category: "Web Development",
  },
]

export function BestsellerCoursesSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/80 bg-zinc-50/40 px-4 py-9 transition-colors sm:px-6 sm:py-14 lg:px-10 dark:bg-zinc-950/40">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white px-3 py-1 text-[10px] font-bold tracking-widest text-zinc-900 uppercase shadow-2xs backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
              <Flame className="size-3 text-zinc-900 dark:text-white" />
              <span>MOST POPULAR PICKS</span>
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Bestseller Courses
            </h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              The highest-rated, student-recommended tracks with proven career
              outcomes.
            </p>
          </div>

          <a
            href="#all-courses"
            className="inline-flex items-center gap-1.5 self-start text-xs font-bold text-zinc-900 transition-colors hover:text-zinc-600 sm:self-auto dark:text-zinc-100 dark:hover:text-zinc-400"
          >
            <span>Explore full catalog</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>

        {/* 4-Column Spotlight Grid */}
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {BESTSELLER_COURSES.map((course) => (
            <article
              key={course.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200/90 bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800/90 dark:hover:border-zinc-700"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                {/* Bestseller Badge */}
                <span className="absolute top-2.5 left-2.5 inline-flex items-center rounded-full border border-white/20 bg-black/75 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-md">
                  {course.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  {/* Rating & Language */}
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1 font-bold text-foreground">
                      <Star className="size-3.5 fill-current text-zinc-950 dark:text-white" />
                      <span>{course.rating.toFixed(2)}</span>
                      <span className="font-normal text-muted-foreground">
                        ({course.reviewsCount.toLocaleString()})
                      </span>
                    </div>
                    <span className="rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium">
                      English
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mt-2 line-clamp-1 text-sm font-black tracking-tight text-foreground group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                    {course.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {course.subtitle}
                  </p>
                </div>

                {/* Pricing & CTA Button */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-3">
                  <div className="flex min-w-0 flex-wrap items-baseline gap-1.5">
                    <span className="text-base font-black text-foreground">
                      {course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-xs font-medium text-muted-foreground line-through">
                        {course.originalPrice}
                      </span>
                    )}
                  </div>

                  <Link
                    to={"/sign-up" as any}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border border-zinc-300/80 bg-zinc-100 px-3.5 py-1.5 text-xs font-bold text-zinc-900 shadow-2xs transition-all",
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
          ))}
        </div>
      </div>
    </section>
  )
}
