import { createFileRoute } from "@tanstack/react-router"

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

        {/* 1. Course catalog and category filters */}
        <CoursesCatalogFiltered />

        {/* 2. Best Seller Courses */}
        <BestsellerCoursesSection />

        {/* 3. Popular Instructors */}
        <PopularInstructorsSection />

        <SiteFooter />
        <FloatingThemeCustomizer />
      </SidebarInset>
    </SidebarProvider>
  )
}
