import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"

import type { HeroItem } from "./types"

export const DEFAULT_HERO_ITEMS: HeroItem[] = [
  {
    id: "course-1",
    type: "course",
    title: "Cinematic Film & Storytelling",
    highlightWord: "Vision,",
    description:
      "Master cinematic composition, camera movement, and visual narrative directly from industry-leading filmmakers.",
    thumbnailUrl: "/creators/team-01.webp",
    trailerVideoUrl: "/videos/bheda-ko-oon.mp4",
    rating: 4.9,
    reviewsCount: 1240,
    enrolledCount: 3820,
    badge: "Bestseller Course",
    instructor: {
      name: "Aayush Sharma",
      avatarUrl: "/creators/team-01.webp",
      role: "Lead Cinematographer",
    },
    enrollUrl: "/sign-up",
    avatars: [
      "/creators/team-01.webp",
      "/creators/team-02.webp",
      "/creators/team-03.webp",
      "/creators/team-04.webp",
    ],
  },
  {
    id: "workshop-1",
    type: "workshop",
    title: "Product Design & Design Systems",
    highlightWord: "Craft,",
    description:
      "A hands-on live workshop breaking down scalable Figma systems, interaction physics, and modern UI tokens.",
    thumbnailUrl: "/creators/team-02.webp",
    trailerVideoUrl: "/videos/bheda-ko-oon.mp4",
    rating: 5.0,
    reviewsCount: 890,
    enrolledCount: 2150,
    badge: "Live Workshop",
    instructor: {
      name: "Prashant Rai",
      avatarUrl: "/creators/team-02.webp",
      role: "Staff Product Designer",
    },
    enrollUrl: "/sign-up",
    avatars: [
      "/creators/team-02.webp",
      "/creators/team-03.webp",
      "/creators/team-04.webp",
      "/creators/team-5-img-1.webp",
    ],
  },
  {
    id: "course-2",
    type: "course",
    title: "Full-Stack Web Architecture",
    highlightWord: "Scale,",
    description:
      "Build high-performance web applications using React, TanStack, Node.js, and cloud-native databases.",
    thumbnailUrl: "/creators/team-03.webp",
    trailerVideoUrl: "/videos/bheda-ko-oon.mp4",
    rating: 4.8,
    reviewsCount: 2310,
    enrolledCount: 5400,
    badge: "Core Engineering",
    instructor: {
      name: "Suman Shrestha",
      avatarUrl: "/creators/team-03.webp",
      role: "Principal Engineer",
    },
    enrollUrl: "/sign-up",
    avatars: [
      "/creators/team-03.webp",
      "/creators/team-04.webp",
      "/creators/team-5-img-1.webp",
      "/creators/team-5-img-2.webp",
    ],
  },
  {
    id: "workshop-2",
    type: "workshop",
    title: "Brand Identity & Visual Strategy",
    highlightWord: "Impact,",
    description:
      "Transform business ideas into iconic brand experiences through typography, color psychology, and art direction.",
    thumbnailUrl: "/creators/team-04.webp",
    trailerVideoUrl: "/videos/bheda-ko-oon.mp4",
    rating: 4.9,
    reviewsCount: 640,
    enrolledCount: 1680,
    badge: "Live Intensive",
    instructor: {
      name: "Anjali Thapa",
      avatarUrl: "/creators/team-04.webp",
      role: "Creative Director",
    },
    enrollUrl: "/sign-up",
    avatars: [
      "/creators/team-04.webp",
      "/creators/team-5-img-1.webp",
      "/creators/team-5-img-2.webp",
      "/creators/team-5-img-3.webp",
    ],
  },
  {
    id: "course-3",
    type: "course",
    title: "Modern AI Engineering & LLMs",
    highlightWord: "Intelligence,",
    description:
      "Deploy production-grade agentic workflows, embeddings, vector search, and fine-tuned open models.",
    thumbnailUrl: "/creators/team-5-img-1.webp",
    trailerVideoUrl: "/videos/bheda-ko-oon.mp4",
    rating: 5.0,
    reviewsCount: 1120,
    enrolledCount: 4200,
    badge: "Advanced Course",
    instructor: {
      name: "Bikash Gurung",
      avatarUrl: "/creators/team-5-img-1.webp",
      role: "AI Research Lead",
    },
    enrollUrl: "/sign-up",
    avatars: [
      "/creators/team-5-img-1.webp",
      "/creators/team-5-img-2.webp",
      "/creators/team-5-img-3.webp",
      "/creators/team-01.webp",
    ],
  },
  {
    id: "workshop-3",
    type: "workshop",
    title: "Mobile App Development with Flutter",
    highlightWord: "Elegance,",
    description:
      "Design and ship cross-platform native iOS & Android applications with custom shaders and fluid animations.",
    thumbnailUrl: "/creators/team-5-img-2.webp",
    trailerVideoUrl: "/videos/bheda-ko-oon.mp4",
    rating: 4.9,
    reviewsCount: 950,
    enrolledCount: 2900,
    badge: "Interactive Workshop",
    instructor: {
      name: "Sunil Joshi",
      avatarUrl: "/creators/team-5-img-2.webp",
      role: "Lead Mobile Architect",
    },
    enrollUrl: "/sign-up",
    avatars: [
      "/creators/team-5-img-2.webp",
      "/creators/team-5-img-3.webp",
      "/creators/team-01.webp",
      "/creators/team-02.webp",
    ],
  },
]

interface RawCourse {
  id: string
  title: string
  subtitle?: string
  description?: string
  thumbnailUrl?: string
  trailerUrl?: string
  avgRating?: number
  enrolledStudents?: number
  reviewCount?: number
  categories?: Array<{ name: string; slug: string }>
  mentor?: {
    fullName?: string
    avatarUrl?: string
    aboutMe?: string
  }
}

interface RawWorkshop {
  id: string
  title: string
  subtitle?: string
  description?: string
  thumbnailUrl?: string
  trailerUrl?: string
  avgRating?: number
  enrolledStudents?: number
  reviewCount?: number
  mentor?: {
    fullName?: string
    avatarUrl?: string
  }
}

function stripHtml(html: string = ""): string {
  return html.replace(/<[^>]*>?/gm, "").trim()
}

export function useHeroShowcase() {
  return useQuery<HeroItem[]>({
    queryKey: ["hero-showcase"],
    queryFn: async () => {
      try {
        const [coursesRes, workshopsRes] = await Promise.allSettled([
          api.get<{ courses?: RawCourse[] }>("/public/courses"),
          api.get<{ workshops?: RawWorkshop[] }>(
            "/public/workshops?page=0&size=10"
          ),
        ])

        const fetchedItems: HeroItem[] = []

        if (
          coursesRes.status === "fulfilled" &&
          coursesRes.value.data?.courses
        ) {
          coursesRes.value.data.courses.forEach((c) => {
            const rawDesc = stripHtml(c.description || c.subtitle || "")
            fetchedItems.push({
              id: c.id,
              type: "course",
              title: c.title?.trim() || "Nepali Mentor Course",
              description:
                rawDesc.length > 160
                  ? rawDesc.slice(0, 160) + "..."
                  : rawDesc ||
                    "Accelerate your mastery with hands-on projects and industry mentors.",
              thumbnailUrl: c.thumbnailUrl || "/creators/team-01.webp",
              trailerVideoUrl: c.trailerUrl || "/videos/bheda-ko-oon.mp4",
              rating:
                typeof c.avgRating === "number" && c.avgRating > 0
                  ? c.avgRating
                  : 4.9,
              reviewsCount: c.reviewCount || 12,
              enrolledCount: c.enrolledStudents || 150,
              badge: c.categories?.[0]?.name
                ? `${c.categories[0].name} Course`
                : "Featured Course",
              instructor: {
                name: c.mentor?.fullName || "Nepali Mentor",
                avatarUrl: c.mentor?.avatarUrl || "/creators/team-01.webp",
                role: "Instructor",
              },
              enrollUrl: `/sign-up`,
              avatars: [
                c.mentor?.avatarUrl || "/creators/team-01.webp",
                "/creators/team-02.webp",
                "/creators/team-03.webp",
                "/creators/team-04.webp",
              ],
            })
          })
        }

        if (
          workshopsRes.status === "fulfilled" &&
          workshopsRes.value.data?.workshops
        ) {
          workshopsRes.value.data.workshops.forEach((w) => {
            const rawDesc = stripHtml(w.description || w.subtitle || "")
            fetchedItems.push({
              id: w.id,
              type: "workshop",
              title: w.title?.trim() || "Live Practical Workshop",
              description:
                rawDesc.length > 160
                  ? rawDesc.slice(0, 160) + "..."
                  : rawDesc ||
                    "Interactive live session with industry leaders and direct code feedback.",
              thumbnailUrl: w.thumbnailUrl || "/creators/team-02.webp",
              trailerVideoUrl: w.trailerUrl || "/videos/bheda-ko-oon.mp4",
              rating:
                typeof w.avgRating === "number" && w.avgRating > 0
                  ? w.avgRating
                  : 5.0,
              reviewsCount: w.reviewCount || 18,
              enrolledCount: w.enrolledStudents || 280,
              badge: "Live Workshop",
              instructor: {
                name: w.mentor?.fullName || "Industry Specialist",
                avatarUrl: w.mentor?.avatarUrl || "/creators/team-02.webp",
                role: "Workshop Leader",
              },
              enrollUrl: `/sign-up`,
              avatars: [
                w.mentor?.avatarUrl || "/creators/team-02.webp",
                "/creators/team-03.webp",
                "/creators/team-04.webp",
                "/creators/team-5-img-1.webp",
              ],
            })
          })
        }

        // If API returned items, append fallbacks if needed so the 3D ring has at least 6 cards
        if (fetchedItems.length > 0) {
          if (fetchedItems.length < 6) {
            return [
              ...fetchedItems,
              ...DEFAULT_HERO_ITEMS.slice(fetchedItems.length, 6),
            ]
          }
          return fetchedItems
        }

        return DEFAULT_HERO_ITEMS
      } catch (err) {
        console.warn(
          "Failed to fetch hero showcase items, using defaults:",
          err
        )
        return DEFAULT_HERO_ITEMS
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
