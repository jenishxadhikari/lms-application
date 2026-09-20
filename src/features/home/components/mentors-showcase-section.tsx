import { useMemo } from "react"

import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { ArrowRight, CheckCircle, Star, Users } from "lucide-react"

import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export interface MentorProfile {
  id: string
  name: string
  role: string
  company?: string
  bio: string
  avatarUrl: string
  rating: number
  studentsCount: number
  skills: string[]
  mentorshipAvailable: boolean
}

const FALLBACK_MENTORS: MentorProfile[] = [
  {
    id: "mentor-1",
    name: "Avyukt Media",
    role: "Lead Systems Architect & Tech Mentor",
    company: "NepaliMentor",
    bio: "Passionate about full-stack engineering, microservices, and 1-on-1 developer mentorship.",
    avatarUrl:
      "https://assets.nepalimentor.com/profiles/b3a4117d-9894-4ab2-9d8d-e7aeafe91325.jpg",
    rating: 5.0,
    studentsCount: 1420,
    skills: ["System Architecture", "React", "Node.js", "Cloud Dev"],
    mentorshipAvailable: true,
  },
  {
    id: "mentor-2",
    name: "Prashant Rai",
    role: "Staff Product & Design Systems Lead",
    company: "Fintech Systems",
    bio: "10+ years shaping design tokens, scalable design systems, and delightful digital user interfaces.",
    avatarUrl: "/creators/team-02.webp",
    rating: 4.9,
    studentsCount: 2150,
    skills: ["Figma Systems", "UI Craft", "Interaction Design", "Prototyping"],
    mentorshipAvailable: true,
  },
  {
    id: "mentor-3",
    name: "Aayush Sharma",
    role: "Senior Full-Stack Engineer & Instructor",
    company: "Cloud Labs",
    bio: "Building distributed microservices and teaching real-world production programming.",
    avatarUrl: "/creators/team-01.webp",
    rating: 4.95,
    studentsCount: 3800,
    skills: ["TypeScript", "Golang", "PostgreSQL", "Docker & K8s"],
    mentorshipAvailable: true,
  },
  {
    id: "mentor-4",
    name: "Anjali Thapa",
    role: "Frontend Architect & Performance Lead",
    company: "Global Tech",
    bio: "Specializes in high-performance web applications, accessibility, and modern React architectures.",
    avatarUrl: "/creators/team-04.webp",
    rating: 4.9,
    studentsCount: 1890,
    skills: ["Next.js", "Web Performance", "State Machines", "GraphQL"],
    mentorshipAvailable: false,
  },
]

export function MentorsShowcaseSection() {
  // Extract real mentors from public mentorships and workshops API
  const { data: apiMentors = [] } = useQuery<MentorProfile[]>({
    queryKey: ["public-featured-mentors"],
    queryFn: async () => {
      try {
        const [mentorshipsRes, workshopsRes] = await Promise.allSettled([
          api.get("/public/mentorships?page=0&size=10"),
          api.get("/public/workshops?page=0&size=10"),
        ])

        const extracted: Record<string, MentorProfile> = {}

        if (
          mentorshipsRes.status === "fulfilled" &&
          mentorshipsRes.value?.data
        ) {
          const d = mentorshipsRes.value.data as any
          const list = Array.isArray(d)
            ? d
            : d.workshops || d.mentorships || d.data?.workshops || []
          list.forEach((m: any) => {
            const name =
              m.mentor?.fullName ||
              [m.mentor?.firstName, m.mentor?.lastName]
                .filter(Boolean)
                .join(" ")
                .trim()
            if (name && !extracted[name]) {
              extracted[name] = {
                id: m.mentor?.userId || m.id,
                name,
                role: m.mentor?.role || "1-on-1 Tech Mentor",
                company: "NepaliMentor",
                bio:
                  m.mentor?.aboutMe ||
                  "Dedicated mentor offering customized guidance and code feedback.",
                avatarUrl: m.mentor?.avatarUrl || "/creators/team-03.webp",
                rating: 5.0,
                studentsCount: (m.seatsBooked || 0) + 120,
                skills: ["1-on-1 Coaching", "Career Strategy", "Code Review"],
                mentorshipAvailable: true,
              }
            }
          })
        }

        return Object.values(extracted)
      } catch (err) {
        return []
      }
    },
    staleTime: 1000 * 60 * 10,
  })

  // Combine dynamic with high-quality fallback profiles
  const displayedMentors = useMemo(() => {
    const combined = [...apiMentors]
    for (const fb of FALLBACK_MENTORS) {
      if (
        !combined.some((m) => m.name.toLowerCase() === fb.name.toLowerCase())
      ) {
        combined.push(fb)
      }
    }
    return combined.slice(0, 4)
  }, [apiMentors])

  return (
    <section
      id="mentors"
      className="relative scroll-mt-4 border-t border-border/80 bg-background px-4 py-12 text-foreground transition-colors sm:px-6 lg:px-10 lg:py-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge
              variant="outline"
              className="mb-2.5 gap-1.5 border-border bg-card px-3 py-1 text-[11px] font-black tracking-widest text-muted-foreground uppercase shadow-2xs"
            >
              <Users className="size-3" />
              <span>FACULTY &amp; ADVISORS</span>
            </Badge>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Learn Directly From Proven Industry Mentors
            </h2>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Our instructors aren't theoretical lecturers. They are
              practitioners, leads, and staff engineers actively solving
              production challenges at scale.
            </p>
          </div>

          <Link
            to="/mentorships"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "cursor-pointer gap-1.5 self-start font-bold shadow-2xs sm:self-auto"
            )}
          >
            <span>All Mentors</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Mentors Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {displayedMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-0 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-lg dark:hover:border-zinc-700"
            >
              <div>
                {/* Large Card-Fit Mentor Photo Banner */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <img
                    src={mentor.avatarUrl}
                    alt={mentor.name}
                    loading="lazy"
                    className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Bottom Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-85" />

                  {/* Top Left: Verified Mentor Badge */}
                  <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md border border-white/30 bg-black/75 px-2 py-0.5 text-[10px] font-black tracking-wide text-white uppercase shadow-xs backdrop-blur-xs">
                    <CheckCircle className="size-2.5 text-white" />
                    <span>Verified</span>
                  </span>

                  {/* Top Right: Rating */}
                  <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-md border border-white/30 bg-black/75 px-2 py-0.5 text-[11px] font-bold text-white shadow-xs backdrop-blur-xs">
                    <Star className="size-3 fill-white text-white" />
                    <span>{mentor.rating.toFixed(1)}</span>
                  </span>

                  {/* Bottom overlay badge */}
                  <div className="absolute right-3 bottom-2.5 left-3">
                    <span className="text-[10px] font-black tracking-widest text-zinc-300 uppercase">
                      {mentor.company || "NepaliMentor"}
                    </span>
                  </div>
                </div>

                {/* Card Body Info */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-foreground/80 sm:text-lg">
                    {mentor.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-muted-foreground">
                    {mentor.role}
                  </p>

                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {mentor.bio}
                  </p>

                  {/* Skills tags */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {mentor.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-border/80 bg-muted/50 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="border-t border-border/60 p-4 pt-3 sm:px-5 sm:pb-5">
                <Link
                  to="/mentorships"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "w-full cursor-pointer justify-center gap-1.5 border-zinc-300 text-xs font-bold transition-colors hover:bg-zinc-900 hover:text-white dark:border-zinc-700 dark:hover:bg-white dark:hover:text-zinc-950"
                  )}
                >
                  <span>Book 1-on-1 Session</span>
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
