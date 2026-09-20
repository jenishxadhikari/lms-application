import { useQuery } from "@tanstack/react-query"

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

/**
 * Hook to fetch hero showcase courses and workshops.
 * When the backend API is ready, replace or supplement the queryFn with:
 * `const res = await api.get('/courses/hero-showcase'); return res.data;`
 */
export function useHeroShowcase() {
  return useQuery<HeroItem[]>({
    queryKey: ["hero-showcase"],
    queryFn: async () => {
      // Prepared for backend integration
      return DEFAULT_HERO_ITEMS
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
