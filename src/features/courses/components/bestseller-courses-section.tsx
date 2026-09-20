import { Link } from "@tanstack/react-router"
import {
  ArrowRight,
  Clock,
  Flame,
  Play,
  Sparkles,
  Star,
  Users,
} from "lucide-react"

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
]

export function BestsellerCoursesSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/80 bg-zinc-50/40 py-10 transition-colors sm:py-14 dark:bg-zinc-950/40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
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

        {/* 3-Column Spotlight Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BESTSELLER_COURSES.map((course) => (
            <article
              key={course.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800/90 dark:bg-zinc-900/60 dark:hover:border-zinc-700 dark:hover:shadow-2xl"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Top Badge: Level & Category */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-zinc-950/80 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-md">
                    <Sparkles className="size-2.5" />
                    <span>{course.badge}</span>
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-900 shadow-xs backdrop-blur-md dark:bg-zinc-900/90 dark:text-zinc-100">
                    {course.category}
                  </span>
                </div>

                {/* Duration & Lessons Overlay */}
                <div className="absolute right-3 bottom-3 flex items-center gap-2 text-[11px] font-medium text-white/95">
                  <span className="inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                    <Clock className="size-3" />
                    <span>{course.duration}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                    <Play className="size-3" />
                    <span>{course.totalLessons}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                {/* Rating & Learners */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 font-bold text-zinc-900 dark:text-zinc-100">
                    <Star className="size-3.5 fill-current text-zinc-950 dark:text-white" />
                    <span>{course.rating.toFixed(2)}</span>
                    <span className="font-normal text-muted-foreground">
                      ({course.reviewsCount.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                    <Users className="size-3" />
                    <span>
                      {course.enrolledCount.toLocaleString()} enrolled
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="mt-2.5 line-clamp-1 text-base font-black tracking-tight text-foreground group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                  {course.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {course.subtitle}
                </p>

                {/* Instructor Row */}
                <div className="mt-4 flex items-center gap-2.5 border-t border-border/50 pt-3">
                  <img
                    src={course.instructor.avatarUrl}
                    alt={course.instructor.name}
                    className="size-7 rounded-full border border-border object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-foreground">
                      {course.instructor.name}
                    </p>
                    <p className="truncate text-[10px] text-muted-foreground">
                      {course.instructor.role}
                    </p>
                  </div>
                </div>

                {/* Pricing & CTA Button */}
                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                  <div className="flex items-baseline gap-1.5">
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
                    <span>Enroll Now</span>
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
