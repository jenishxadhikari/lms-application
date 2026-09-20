import { Link } from "@tanstack/react-router"
import { ArrowRight, Sparkles, Star, Users } from "lucide-react"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"

const ALUMNI_AVATARS = [
  { src: "/creators/team-01.webp" },
  { src: "/creators/team-02.webp" },
  { src: "/creators/team-03.webp" },
  { src: "/creators/team-04.webp" },
]

export function CtaBannerSection() {
  return (
    <section className="relative overflow-hidden border-t border-border/80 bg-zinc-50/50 py-12 transition-colors sm:py-16 lg:py-20 dark:bg-black">
      {/* Subtle micro-dot pattern for crisp texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:20px_20px] opacity-60 dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] dark:opacity-30"
        aria-hidden="true"
      />

      {/* Soft ambient monochrome glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-zinc-200/40 blur-3xl dark:bg-zinc-800/25"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white px-3.5 py-1 text-[11px] font-bold tracking-widest text-zinc-900 uppercase shadow-2xs backdrop-blur-xs transition-colors dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200">
          <Sparkles className="size-3 text-zinc-900 dark:text-white" />
          <span>START YOUR JOURNEY TODAY</span>
        </div>

        {/* Main Headline */}
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
          Ready to Accelerate Your{" "}
          <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-900 bg-clip-text text-transparent dark:from-white dark:via-zinc-300 dark:to-zinc-400">
            Career in Tech?
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
          Whether you want to build scalable full-stack applications, master
          design systems, or get personalized 1-on-1 guidance from staff
          engineers—NepaliMentor has the track for you.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            hash="courses"
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
              "h-11 w-full cursor-pointer gap-2 rounded-xl border border-zinc-950 bg-zinc-950 px-7 text-xs font-bold text-white shadow-md shadow-zinc-950/15 transition-all hover:-translate-y-0.5 hover:bg-zinc-900 hover:shadow-lg active:translate-y-0 sm:w-auto dark:border-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            )}
          >
            <span>Browse All Courses</span>
            <ArrowRight className="size-3.5" />
          </Link>

          <Link
            to="/"
            hash="mentorship"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "dark:hover:bg-zinc-850 h-11 w-full cursor-pointer gap-2 rounded-xl border-zinc-300 bg-white px-7 text-xs font-bold text-zinc-900 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-50 active:translate-y-0 sm:w-auto dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700"
            )}
          >
            <Users className="size-3.5" />
            <span>Book 1-on-1 Mentorship</span>
          </Link>
        </div>

        {/* Compact Social Proof Pill */}
        <div className="mt-6 inline-flex items-center justify-center gap-3 rounded-full border border-zinc-200/90 bg-white px-3.5 py-1.5 shadow-2xs backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="flex -space-x-2" aria-hidden="true">
            {ALUMNI_AVATARS.map((avatar, i) => (
              <div
                key={i}
                className="relative size-6 overflow-hidden rounded-full border-2 border-white bg-zinc-200 shadow-2xs ring-1 ring-zinc-300/50 dark:border-zinc-900 dark:bg-zinc-800 dark:ring-zinc-700"
              >
                <img
                  src={avatar.src}
                  alt=""
                  className="size-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              </div>
            ))}
            <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-zinc-950 text-[9px] font-bold text-white shadow-2xs ring-1 ring-zinc-300/50 dark:border-zinc-900 dark:bg-white dark:text-zinc-950 dark:ring-zinc-700">
              +10k
            </div>
          </div>

          <div className="hidden h-3.5 w-px bg-zinc-300 sm:block dark:bg-zinc-700" />

          <div className="flex items-center gap-1.5">
            <div
              className="flex text-zinc-950 dark:text-white"
              aria-label="5 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              4.95 / 5{" "}
              <span className="font-normal text-zinc-500 dark:text-zinc-400">
                Rating from 10,000+ Students
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
