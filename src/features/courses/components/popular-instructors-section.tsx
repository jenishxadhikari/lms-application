import { Link } from "@tanstack/react-router"
import { ArrowRight, CheckCircle2, Star, Users } from "lucide-react"

import { cn } from "@/lib/utils"

export interface PopularInstructor {
  id: string
  name: string
  role: string
  company: string
  avatarUrl: string
  rating: number
  studentsCount: number
  coursesCount: number
  skills: string[]
  bio: string
}

const INSTRUCTORS: PopularInstructor[] = [
  {
    id: "inst-1",
    name: "Avyukt Media",
    role: "Staff Systems Architect",
    company: "NepaliMentor",
    avatarUrl:
      "https://assets.nepalimentor.com/profiles/b3a4117d-9894-4ab2-9d8d-e7aeafe91325.jpg",
    rating: 5.0,
    studentsCount: 3420,
    coursesCount: 6,
    skills: ["Go", "Distributed Systems", "PostgreSQL", "Docker"],
    bio: "Passionate about full-stack engineering, microservices, and 1-on-1 developer mentorship.",
  },
  {
    id: "inst-2",
    name: "Prashant Rai",
    role: "Staff Product & Design Systems Lead",
    company: "Fintech Systems",
    avatarUrl: "/creators/team-02.webp",
    rating: 4.95,
    studentsCount: 2850,
    coursesCount: 4,
    skills: [
      "Figma Systems",
      "UI Craft",
      "Design Tokens",
      "Micro-Interactions",
    ],
    bio: "10+ years shaping design tokens, scalable design systems, and delightful digital user interfaces.",
  },
  {
    id: "inst-3",
    name: "Aayush Sharma",
    role: "Senior Full-Stack & Video Architect",
    company: "Cloud Labs",
    avatarUrl: "/creators/team-01.webp",
    rating: 4.92,
    studentsCount: 4190,
    coursesCount: 5,
    skills: ["TypeScript", "Next.js", "Video Streaming", "Web Performance"],
    bio: "Building distributed microservices and teaching real-world production programming.",
  },
  {
    id: "inst-4",
    name: "Anjali Thapa",
    role: "Lead Frontend Architect",
    company: "Global Tech",
    avatarUrl: "/creators/team-04.webp",
    rating: 4.9,
    studentsCount: 2120,
    coursesCount: 3,
    skills: ["React 19", "State Machines", "Accessibility", "Tailwind CSS"],
    bio: "Specializes in high-performance web applications, accessibility, and modern React architectures.",
  },
]

export function PopularInstructorsSection() {
  return (
    <section className="relative overflow-hidden border-t border-border/80 bg-zinc-50/50 py-12 transition-colors sm:py-16 lg:py-20 dark:bg-zinc-950/50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white px-3 py-1 text-[10px] font-bold tracking-widest text-zinc-900 uppercase shadow-2xs backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
              <CheckCircle2 className="size-3 text-zinc-900 dark:text-white" />
              <span>INDUSTRY LEADERS</span>
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Popular Instructors
            </h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Learn directly from seasoned engineers, designers, and tech
              founders.
            </p>
          </div>

          <Link
            to={"/contact-us" as any}
            className="inline-flex items-center gap-1.5 self-start text-xs font-bold text-zinc-900 transition-colors hover:text-zinc-600 sm:self-auto dark:text-zinc-100 dark:hover:text-zinc-400"
          >
            <span>Become an instructor</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* 4-Column Instructors Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INSTRUCTORS.map((instructor) => (
            <div
              key={instructor.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800/90 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={instructor.avatarUrl}
                  alt={instructor.name}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/creators/team-01.webp"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                {/* Verified Pill */}
                <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/75 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                  <CheckCircle2 className="size-3 text-white" />
                  <span>Verified Mentor</span>
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-black tracking-tight text-foreground">
                  {instructor.name}
                </h3>
                <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                  {instructor.role} &bull; {instructor.company}
                </p>

                {/* Rating & Stats */}
                <div className="mt-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 font-bold text-zinc-900 dark:text-zinc-100">
                    <Star className="size-3.5 fill-current text-zinc-950 dark:text-white" />
                    <span>{instructor.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                    <Users className="size-3" />
                    <span>
                      {instructor.studentsCount.toLocaleString()} learners
                    </span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {instructor.skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-semibold text-foreground/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <div className="mt-4 border-t border-border/60 pt-2">
                  <Link
                    to="/"
                    hash="mentorship"
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-zinc-300/80 bg-zinc-100 py-1.5 text-xs font-bold text-zinc-900 shadow-2xs transition-all",
                      "hover:-translate-y-0.5 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white hover:shadow-sm active:translate-y-0",
                      "dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-white dark:hover:bg-white dark:hover:text-zinc-950"
                    )}
                  >
                    <span>View Courses &amp; Mentorship</span>
                    <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
