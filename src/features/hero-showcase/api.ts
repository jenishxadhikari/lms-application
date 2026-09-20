import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"

import type { HeroItem } from "./types"

export type { HeroItem }

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
    price: "Rs. 2,999",
    totalLessons: "28 Lessons",
    duration: "14.5 Hours",
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
    price: "Rs. 1,999",
    totalLessons: "8 Modules",
    duration: "6.0 Hours",
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
    price: "Rs. 3,499",
    totalLessons: "42 Lessons",
    duration: "24.0 Hours",
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
    price: "Rs. 2,499",
    totalLessons: "12 Modules",
    duration: "8.5 Hours",
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
    price: "Rs. 4,999",
    totalLessons: "36 Lessons",
    duration: "18.0 Hours",
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
    price: "Rs. 2,799",
    totalLessons: "16 Modules",
    duration: "10.0 Hours",
    enrollUrl: "/sign-up",
    avatars: [
      "/creators/team-5-img-2.webp",
      "/creators/team-5-img-3.webp",
      "/creators/team-01.webp",
      "/creators/team-02.webp",
    ],
  },
  {
    id: "course-4",
    type: "course",
    title: "Cloud Architecture & DevOps Systems",
    highlightWord: "Resilience,",
    description:
      "Architect resilient cloud infrastructure with Docker, Kubernetes, CI/CD pipelines, and zero-downtime deployments.",
    thumbnailUrl: "/creators/team-5-img-3.webp",
    trailerVideoUrl: "/videos/bheda-ko-oon.mp4",
    rating: 5.0,
    reviewsCount: 780,
    enrolledCount: 3100,
    badge: "DevOps Course",
    instructor: {
      name: "Kiran Shrestha",
      avatarUrl: "/creators/team-03.webp",
      role: "Principal Systems Architect",
    },
    price: "Rs. 3,999",
    totalLessons: "32 Lessons",
    duration: "16.5 Hours",
    enrollUrl: "/sign-up",
    avatars: [
      "/creators/team-5-img-3.webp",
      "/creators/team-01.webp",
      "/creators/team-02.webp",
      "/creators/team-04.webp",
    ],
  },
  {
    id: "workshop-4",
    type: "workshop",
    title: "Next.js & Serverless Architecture",
    highlightWord: "Velocity,",
    description:
      "Master edge rendering, streaming SSR, server actions, and serverless database caching at global scale.",
    thumbnailUrl: "/creators/team-02.webp",
    trailerVideoUrl: "/videos/bheda-ko-oon.mp4",
    rating: 4.9,
    reviewsCount: 810,
    enrolledCount: 2450,
    badge: "Specialized Workshop",
    instructor: {
      name: "Rohan Tamang",
      avatarUrl: "/creators/team-02.webp",
      role: "Staff Platform Engineer",
    },
    price: "Rs. 2,299",
    totalLessons: "10 Modules",
    duration: "7.0 Hours",
    enrollUrl: "/sign-up",
    avatars: [
      "/creators/team-02.webp",
      "/creators/team-03.webp",
      "/creators/team-04.webp",
      "/creators/team-5-img-1.webp",
    ],
  },
  {
    id: "course-5",
    type: "course",
    title: "Cybersecurity & Defense Systems",
    highlightWord: "Fortitude,",
    description:
      "Learn offensive penetration testing, defensive hardening, web exploits, and incident response architecture.",
    thumbnailUrl: "/creators/team-04.webp",
    trailerVideoUrl: "/videos/bheda-ko-oon.mp4",
    rating: 5.0,
    reviewsCount: 690,
    enrolledCount: 1980,
    badge: "Security Course",
    instructor: {
      name: "Samir Karki",
      avatarUrl: "/creators/team-04.webp",
      role: "Security Principal",
    },
    price: "Rs. 4,499",
    totalLessons: "38 Lessons",
    duration: "20.0 Hours",
    enrollUrl: "/sign-up",
    avatars: [
      "/creators/team-04.webp",
      "/creators/team-5-img-1.webp",
      "/creators/team-5-img-2.webp",
      "/creators/team-01.webp",
    ],
  },
  {
    id: "workshop-5",
    type: "workshop",
    title: "3D Motion Graphics & Unreal Engine",
    highlightWord: "Dimension,",
    description:
      "Create real-time cinematic 3D worlds, procedural lighting, and immersive visual effects in Unreal Engine 5.",
    thumbnailUrl: "/creators/team-5-img-1.webp",
    trailerVideoUrl: "/videos/bheda-ko-oon.mp4",
    rating: 5.0,
    reviewsCount: 920,
    enrolledCount: 2680,
    badge: "3D Workshop",
    instructor: {
      name: "Ritesh Shrestha",
      avatarUrl: "/creators/team-5-img-1.webp",
      role: "Lead 3D & VFX Artist",
    },
    price: "Rs. 3,199",
    totalLessons: "14 Modules",
    duration: "9.5 Hours",
    enrollUrl: "/sign-up",
    avatars: [
      "/creators/team-5-img-1.webp",
      "/creators/team-5-img-2.webp",
      "/creators/team-5-img-3.webp",
      "/creators/team-01.webp",
    ],
  },
]

interface RawCourse {
  id: string
  title: string
  subtitle?: string
  description?: string
  thumbnailUrl?: string
  coverImageUrl?: string
  coverImage?: string
  imageUrl?: string
  thumbnail?: string
  trailerUrl?: string
  trailer?: string
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
  coverImageUrl?: string
  coverImage?: string
  imageUrl?: string
  thumbnail?: string
  trailerUrl?: string
  trailer?: string
  avgRating?: number
  enrolledStudents?: number
  reviewCount?: number
  mentor?: {
    fullName?: string
    avatarUrl?: string
  }
}

interface RawMentorship {
  id: string
  title: string
  subtitle?: string
  brief?: string
  description?: string
  thumbnailUrl?: string
  coverImageUrl?: string
  coverImage?: string
  imageUrl?: string
  thumbnail?: string
  trailerUrl?: string
  trailer?: string
  entryFee?: number
  price?: number
  fee?: number
  amount?: number
  avgRating?: number
  enrolledStudents?: number
  reviewCount?: number
  sessions?: Array<{ id?: string; title?: string }>
  mentor?: {
    fullName?: string
    firstName?: string
    lastName?: string
    avatarUrl?: string
    role?: string
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
        const [coursesRes, workshopsRes, mentorshipsRes] =
          await Promise.allSettled([
            api.get<{ courses?: RawCourse[] }>("/public/courses"),
            api.get<{ workshops?: RawWorkshop[] }>(
              "/public/workshops?page=0&size=10"
            ),
            api.get<{ mentorships?: RawMentorship[] }>(
              "/public/mentorships?page=0&size=10"
            ),
          ])

        const DUMMY_COURSE_PRICES = [
          "Rs. 2,999",
          "Rs. 3,499",
          "Rs. 4,999",
          "Rs. 3,999",
          "Rs. 4,499",
        ]
        const DUMMY_COURSE_LESSONS = [
          "28 Lessons",
          "36 Lessons",
          "42 Lessons",
          "32 Lessons",
          "24 Lessons",
        ]
        const DUMMY_COURSE_DURATIONS = [
          "14.5 Hours",
          "18.0 Hours",
          "24.0 Hours",
          "16.5 Hours",
          "12.0 Hours",
        ]
        const DUMMY_COURSE_MENTORS = [
          { name: "Aayush Sharma", avatarUrl: "/creators/team-01.webp" },
          { name: "Suman Shrestha", avatarUrl: "/creators/team-03.webp" },
          { name: "Bikash Gurung", avatarUrl: "/creators/team-5-img-1.webp" },
          { name: "Kiran Shrestha", avatarUrl: "/creators/team-03.webp" },
          { name: "Samir Karki", avatarUrl: "/creators/team-04.webp" },
        ]

        const DUMMY_WORKSHOP_PRICES = [
          "Rs. 1,999",
          "Rs. 2,499",
          "Rs. 2,799",
          "Rs. 2,299",
          "Rs. 3,199",
        ]
        const DUMMY_WORKSHOP_LESSONS = [
          "8 Modules",
          "12 Modules",
          "16 Modules",
          "10 Modules",
          "14 Modules",
        ]
        const DUMMY_WORKSHOP_DURATIONS = [
          "6.0 Hours",
          "8.5 Hours",
          "10.0 Hours",
          "7.0 Hours",
          "9.5 Hours",
        ]
        const DUMMY_WORKSHOP_MENTORS = [
          { name: "Prashant Rai", avatarUrl: "/creators/team-02.webp" },
          { name: "Anjali Thapa", avatarUrl: "/creators/team-04.webp" },
          { name: "Sunil Joshi", avatarUrl: "/creators/team-5-img-2.webp" },
          { name: "Rohan Tamang", avatarUrl: "/creators/team-02.webp" },
          { name: "Ritesh Shrestha", avatarUrl: "/creators/team-5-img-1.webp" },
        ]

        const fetchedItems: HeroItem[] = []

        let rawCoursesList: RawCourse[] = []
        if (coursesRes.status === "fulfilled" && coursesRes.value?.data) {
          const d = coursesRes.value.data as any
          if (Array.isArray(d)) rawCoursesList = d
          else if (Array.isArray(d.courses)) rawCoursesList = d.courses
          else if (Array.isArray(d.data?.courses))
            rawCoursesList = d.data.courses
          else if (Array.isArray(d.data)) rawCoursesList = d.data
          else if (Array.isArray(d.content)) rawCoursesList = d.content
          else if (Array.isArray(d.items)) rawCoursesList = d.items
        }

        let rawWorkshopsList: RawWorkshop[] = []
        if (workshopsRes.status === "fulfilled" && workshopsRes.value?.data) {
          const d = workshopsRes.value.data as any
          if (Array.isArray(d)) rawWorkshopsList = d
          else if (Array.isArray(d.workshops)) rawWorkshopsList = d.workshops
          else if (Array.isArray(d.data?.workshops))
            rawWorkshopsList = d.data.workshops
          else if (Array.isArray(d.data)) rawWorkshopsList = d.data
          else if (Array.isArray(d.content)) rawWorkshopsList = d.content
          else if (Array.isArray(d.items)) rawWorkshopsList = d.items
        }

        rawCoursesList.forEach((c, idx) => {
          const rawDesc = stripHtml(c.description || c.subtitle || "")
          const mentorFallback =
            DUMMY_COURSE_MENTORS[idx % DUMMY_COURSE_MENTORS.length]
          const instructorName =
            c.mentor?.fullName?.trim() || mentorFallback.name
          const instructorAvatar =
            c.mentor?.avatarUrl || mentorFallback.avatarUrl

          const priceStr =
            typeof (c as any).price === "number"
              ? (c as any).price === 0
                ? "Free"
                : `Rs. ${(c as any).price.toLocaleString()}`
              : (c as any).price ||
                DUMMY_COURSE_PRICES[idx % DUMMY_COURSE_PRICES.length]

          const lessonsStr = (c as any).totalLessons
            ? `${(c as any).totalLessons} Lessons`
            : (c as any).lessonCount
              ? `${(c as any).lessonCount} Lessons`
              : DUMMY_COURSE_LESSONS[idx % DUMMY_COURSE_LESSONS.length]

          const durationStr = (c as any).duration
            ? `${(c as any).duration}`
            : (c as any).totalDuration
              ? `${(c as any).totalDuration}`
              : DUMMY_COURSE_DURATIONS[idx % DUMMY_COURSE_DURATIONS.length]

          const courseThumbnail =
            c.thumbnailUrl ||
            c.coverImageUrl ||
            c.coverImage ||
            c.thumbnail ||
            c.imageUrl ||
            "/creators/team-01.webp"

          fetchedItems.push({
            id: c.id,
            type: "course",
            title: c.title?.trim() || "Nepali Mentor Course",
            description:
              rawDesc.length > 160
                ? rawDesc.slice(0, 160) + "..."
                : rawDesc ||
                  "Accelerate your mastery with hands-on projects and industry mentors.",
            thumbnailUrl: courseThumbnail,
            trailerVideoUrl:
              c.trailerUrl || c.trailer || "/videos/bheda-ko-oon.mp4",
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
              name: instructorName,
              avatarUrl: instructorAvatar,
              role: "Instructor",
            },
            price: priceStr,
            totalLessons: lessonsStr,
            duration: durationStr,
            enrollUrl: `/sign-up`,
            avatars: [
              instructorAvatar,
              "/creators/team-02.webp",
              "/creators/team-03.webp",
              "/creators/team-04.webp",
            ],
          })
        })

        let rawMentorshipsList: RawMentorship[] = []
        if (
          mentorshipsRes.status === "fulfilled" &&
          mentorshipsRes.value?.data
        ) {
          const d = mentorshipsRes.value.data as any
          if (Array.isArray(d)) rawMentorshipsList = d
          else if (Array.isArray(d.mentorships))
            rawMentorshipsList = d.mentorships
          else if (Array.isArray(d.workshops)) rawMentorshipsList = d.workshops
          else if (Array.isArray(d.data?.mentorships))
            rawMentorshipsList = d.data.mentorships
          else if (Array.isArray(d.data)) rawMentorshipsList = d.data
          else if (Array.isArray(d.content)) rawMentorshipsList = d.content
          else if (Array.isArray(d.items)) rawMentorshipsList = d.items
        }

        rawWorkshopsList.forEach((w, idx) => {
          const rawDesc = stripHtml(w.description || w.subtitle || "")
          const mentorFallback =
            DUMMY_WORKSHOP_MENTORS[idx % DUMMY_WORKSHOP_MENTORS.length]
          const instructorName =
            w.mentor?.fullName?.trim() || mentorFallback.name
          const instructorAvatar =
            w.mentor?.avatarUrl || mentorFallback.avatarUrl

          const priceStr =
            typeof (w as any).price === "number"
              ? (w as any).price === 0
                ? "Free"
                : `Rs. ${(w as any).price.toLocaleString()}`
              : (w as any).price ||
                (w as any).entryFee ||
                DUMMY_WORKSHOP_PRICES[idx % DUMMY_WORKSHOP_PRICES.length]

          const lessonsStr = (w as any).totalLessons
            ? `${(w as any).totalLessons} Modules`
            : DUMMY_WORKSHOP_LESSONS[idx % DUMMY_WORKSHOP_LESSONS.length]

          const durationStr = (w as any).duration
            ? `${(w as any).duration}`
            : DUMMY_WORKSHOP_DURATIONS[idx % DUMMY_WORKSHOP_DURATIONS.length]

          const workshopThumbnail =
            w.coverImageUrl ||
            w.coverImage ||
            w.thumbnailUrl ||
            w.thumbnail ||
            w.imageUrl ||
            "/creators/team-02.webp"

          fetchedItems.push({
            id: w.id,
            type: "workshop",
            title: w.title?.trim() || "Live Practical Workshop",
            description:
              rawDesc.length > 160
                ? rawDesc.slice(0, 160) + "..."
                : rawDesc ||
                  "Interactive live session with industry leaders and direct code feedback.",
            thumbnailUrl: workshopThumbnail,
            trailerVideoUrl:
              w.trailerUrl || w.trailer || "/videos/bheda-ko-oon.mp4",
            rating:
              typeof w.avgRating === "number" && w.avgRating > 0
                ? w.avgRating
                : 5.0,
            reviewsCount: w.reviewCount || 18,
            enrolledCount: w.enrolledStudents || 280,
            badge: "Live Workshop",
            instructor: {
              name: instructorName,
              avatarUrl: instructorAvatar,
              role: "Workshop Leader",
            },
            price: priceStr,
            totalLessons: lessonsStr,
            duration: durationStr,
            enrollUrl: `/sign-up`,
            avatars: [
              instructorAvatar,
              "/creators/team-03.webp",
              "/creators/team-04.webp",
              "/creators/team-5-img-1.webp",
            ],
          })
        })

        rawMentorshipsList.forEach((m, idx) => {
          const rawDesc = stripHtml(
            m.description || m.brief || m.subtitle || ""
          )
          const mentorFallback =
            DUMMY_WORKSHOP_MENTORS[idx % DUMMY_WORKSHOP_MENTORS.length]
          const instructorName =
            m.mentor?.fullName?.trim() ||
            [m.mentor?.firstName, m.mentor?.lastName]
              .filter(Boolean)
              .join(" ")
              .trim() ||
            mentorFallback.name
          const instructorAvatar =
            m.mentor?.avatarUrl || mentorFallback.avatarUrl

          const rawPrice = m.entryFee ?? m.price ?? m.fee ?? m.amount
          const priceStr =
            typeof rawPrice === "number"
              ? rawPrice === 0
                ? "Free"
                : `Rs. ${rawPrice.toLocaleString()}`
              : rawPrice || "Rs. 2,999"

          const sessionsCount = m.sessions?.length
          const lessonsStr = sessionsCount
            ? `${sessionsCount} Session${sessionsCount > 1 ? "s" : ""}`
            : "1-on-1 Mentorship"

          const mentorshipThumbnail =
            m.coverImageUrl ||
            m.coverImage ||
            m.thumbnailUrl ||
            m.thumbnail ||
            m.imageUrl ||
            "/creators/team-03.webp"

          fetchedItems.push({
            id: m.id,
            type: "mentorship",
            title: m.title?.trim() || "1-on-1 Mentorship Program",
            description:
              rawDesc.length > 160
                ? rawDesc.slice(0, 160) + "..."
                : rawDesc ||
                  "Direct 1-on-1 personalized mentorship, portfolio reviews, and career guidance.",
            thumbnailUrl: mentorshipThumbnail,
            trailerVideoUrl:
              m.trailerUrl || m.trailer || "/videos/bheda-ko-oon.mp4",
            rating:
              typeof m.avgRating === "number" && m.avgRating > 0
                ? m.avgRating
                : 5.0,
            reviewsCount: m.reviewCount || 24,
            enrolledCount: m.enrolledStudents || 120,
            badge: "1-on-1 Mentorship",
            instructor: {
              name: instructorName,
              avatarUrl: instructorAvatar,
              role: m.mentor?.role || "Industry Mentor",
            },
            price: priceStr,
            totalLessons: lessonsStr,
            duration: "Flexible Schedule",
            enrollUrl: `/sign-up`,
            avatars: [
              instructorAvatar,
              "/creators/team-01.webp",
              "/creators/team-02.webp",
              "/creators/team-04.webp",
            ],
          })
        })

        // If API returned real items, use ONLY real items without appending any dummy courses
        if (fetchedItems.length > 0) {
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
