import { createFileRoute } from "@tanstack/react-router"
import { Sparkles } from "lucide-react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { FloatingThemeCustomizer } from "@/components/floating-theme-customizer"
import { HomeSidebar } from "@/components/sidebar/home-sidebar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

import { BestsellerCoursesSection } from "@/features/courses/components/bestseller-courses-section"
import { CoursesCatalogFiltered } from "@/features/courses/components/courses-catalog-filtered"
import { PopularInstructorsSection } from "@/features/courses/components/popular-instructors-section"

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
})

function CoursesPage() {
  return (
    <SidebarProvider defaultOpen={false}>
      <HomeSidebar />
      <SidebarInset className="!m-0 min-h-svh min-w-0">
        <SiteHeader />

        {/* Page Hero Header */}
        <section className="relative overflow-hidden border-b border-border/80 bg-zinc-50/70 py-12 transition-colors sm:py-16 lg:py-20 dark:bg-black">
          {/* Subtle micro-dot pattern texture */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:20px_20px] opacity-60 dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] dark:opacity-30"
            aria-hidden="true"
          />

          {/* Soft ambient monochrome glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-zinc-200/40 blur-3xl dark:bg-zinc-800/25"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white px-3.5 py-1 text-[11px] font-bold tracking-widest text-zinc-900 uppercase shadow-2xs backdrop-blur-xs transition-colors dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200">
              <Sparkles className="size-3 text-zinc-900 dark:text-white" />
              <span>LEARN &bull; BUILD &bull; EXCEL</span>
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl dark:text-white">
              Explore All{" "}
              <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-900 bg-clip-text text-transparent dark:from-white dark:via-zinc-300 dark:to-zinc-400">
                Courses &amp; Tracks
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
              From foundational software engineering to production design
              systems, master in-demand skills through comprehensive video
              lessons, project capstones, and expert guidance.
            </p>
          </div>
        </section>

        {/* 1. Best Seller Courses Section at Top */}
        <BestsellerCoursesSection />

        {/* 2. All Courses with Filters as in Old UI */}
        <CoursesCatalogFiltered />

        {/* 3. Popular Instructors */}
        <PopularInstructorsSection />

        <SiteFooter />
        <FloatingThemeCustomizer />
      </SidebarInset>
    </SidebarProvider>
  )
}
