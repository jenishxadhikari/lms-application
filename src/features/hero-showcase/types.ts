export type HeroItemType = "course" | "workshop" | "mentorship"

export interface HeroItem {
  id: string
  type: HeroItemType
  title: string
  highlightWord?: string
  description: string
  thumbnailUrl: string
  trailerVideoUrl: string
  rating: number
  reviewsCount: number
  enrolledCount: number
  badge: string
  instructor: {
    name: string
    avatarUrl: string
    role: string
  }
  price: string
  totalLessons: string
  duration: string
  enrollUrl: string
  avatars: string[]
}
