export type Organization = {
  id: string
  name: string
  slug: string
  type: "SYSTEM" | "ORGANIZATION"
  status: "ACTIVE" | "INACTIVE"
  description: string
  timezone: string
  currency: string
  createdAt: string
}

export const typeFilterOptions = [
  { label: "System", value: "SYSTEM" },
  { label: "Organization", value: "ORGANIZATION" },
] as const

export const statusFilterOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
] as const

export const organizations: Organization[] = [
  {
    id: "1",
    name: "Nepali Mentor",
    slug: "nepali-mentor",
    type: "SYSTEM",
    status: "ACTIVE",
    description:
      "Nepali Mentor is a modern Nepali ed-tech and professional growth platform.",
    timezone: "Asia/Kathmandu",
    currency: "NPR",
    createdAt: "2026-03-09",
  },
  {
    id: "2",
    name: "Astro Insights",
    slug: "astro-insights",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description: "A modern astrology and spiritual learning platform.",
    timezone: "Asia/Kathmandu",
    currency: "USD",
    createdAt: "2026-05-23",
  },
  {
    id: "3",
    name: "SkillForge Academy",
    slug: "skillforge-academy",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "A digital learning academy focused on technical and professional skills.",
    timezone: "Asia/Kathmandu",
    currency: "NPR",
    createdAt: "2026-05-24",
  },
  {
    id: "4",
    name: "NextEra Business School",
    slug: "nextera-business-school",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "An online business education platform for aspiring founders and professionals.",
    timezone: "Asia/Kathmandu",
    currency: "USD",
    createdAt: "2026-05-25",
  },
  {
    id: "5",
    name: "CreativeHub Institute",
    slug: "creativehub-institute",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "A creative education platform focused on design, branding, and digital skills.",
    timezone: "Asia/Kathmandu",
    currency: "NPR",
    createdAt: "2026-05-27",
  },
  {
    id: "6",
    name: "CodePeak Labs",
    slug: "codepeak-labs",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "A developer education platform offering modern frontend and backend programs.",
    timezone: "Asia/Kathmandu",
    currency: "USD",
    createdAt: "2026-06-01",
  },
  {
    id: "7",
    name: "MindSpring Learning",
    slug: "mindspring-learning",
    type: "ORGANIZATION",
    status: "INACTIVE",
    description:
      "A learning platform centered around productivity, leadership, and personal growth.",
    timezone: "Asia/Kathmandu",
    currency: "NPR",
    createdAt: "2026-06-03",
  },
  {
    id: "8",
    name: "Everest Tech Academy",
    slug: "everest-tech-academy",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "Technology training programs for software engineering, cloud, and DevOps.",
    timezone: "Asia/Kathmandu",
    currency: "NPR",
    createdAt: "2026-06-05",
  },
  {
    id: "9",
    name: "GrowthStack",
    slug: "growthstack",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "A modern learning community for marketing, growth, and entrepreneurship.",
    timezone: "Asia/Kathmandu",
    currency: "USD",
    createdAt: "2026-06-08",
  },
  {
    id: "10",
    name: "DesignCraft School",
    slug: "designcraft-school",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "Practical design courses covering UI, UX, product design, and visual systems.",
    timezone: "Asia/Kathmandu",
    currency: "NPR",
    createdAt: "2026-06-10",
  },
  {
    id: "11",
    name: "CloudNova Institute",
    slug: "cloudnova-institute",
    type: "ORGANIZATION",
    status: "INACTIVE",
    description:
      "Cloud computing and infrastructure education for engineers and IT teams.",
    timezone: "Asia/Kathmandu",
    currency: "USD",
    createdAt: "2026-06-14",
  },
  {
    id: "12",
    name: "FinancePath Academy",
    slug: "financepath-academy",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "Financial literacy and investment education for students and professionals.",
    timezone: "Asia/Kathmandu",
    currency: "NPR",
    createdAt: "2026-06-17",
  },
  {
    id: "13",
    name: "HealthBridge Learning",
    slug: "healthbridge-learning",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "Continuing education and professional development for healthcare learners.",
    timezone: "Asia/Kathmandu",
    currency: "USD",
    createdAt: "2026-06-21",
  },
  {
    id: "14",
    name: "PixelMind Academy",
    slug: "pixelmind-academy",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "Creative technology courses focused on design systems and digital products.",
    timezone: "Asia/Kathmandu",
    currency: "NPR",
    createdAt: "2026-06-25",
  },
  {
    id: "15",
    name: "StartupSprint",
    slug: "startup-sprint",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "Startup-focused courses on product validation, growth, and fundraising.",
    timezone: "Asia/Kathmandu",
    currency: "USD",
    createdAt: "2026-07-01",
  },
  {
    id: "16",
    name: "DataRise Institute",
    slug: "datarise-institute",
    type: "ORGANIZATION",
    status: "INACTIVE",
    description:
      "Data analytics and machine learning education for aspiring data professionals.",
    timezone: "Asia/Kathmandu",
    currency: "NPR",
    createdAt: "2026-07-04",
  },
  {
    id: "17",
    name: "CareerLift Nepal",
    slug: "careerlift-nepal",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "Career development programs for graduates, job seekers, and young professionals.",
    timezone: "Asia/Kathmandu",
    currency: "NPR",
    createdAt: "2026-07-11",
  },
  {
    id: "18",
    name: "Visionary Leadership",
    slug: "visionary-leadership",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "Leadership and management training for teams, managers, and executives.",
    timezone: "Asia/Kathmandu",
    currency: "USD",
    createdAt: "2026-07-18",
  },
  {
    id: "19",
    name: "LearnSphere",
    slug: "learnsphere",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "A broad online learning platform offering practical courses across multiple industries.",
    timezone: "Asia/Kathmandu",
    currency: "NPR",
    createdAt: "2026-08-03",
  },
  {
    id: "20",
    name: "TechTrail Academy",
    slug: "techtrail-academy",
    type: "ORGANIZATION",
    status: "ACTIVE",
    description:
      "Hands-on software development and engineering education for modern developers.",
    timezone: "Asia/Kathmandu",
    currency: "USD",
    createdAt: "2026-08-25",
  },
]
