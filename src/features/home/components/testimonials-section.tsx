import { MessageSquareQuote, Sparkles, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const TESTIMONIALS = [
  {
    quote:
      "The live workshop on distributed microservices was a game changer. Building a real event-driven architecture with live code reviews helped me ace my technical interview at a top fintech firm.",
    author: "Bikash Shrestha",
    role: "Backend Engineer",
    company: "Fintech Systems",
    avatar: "/creators/team-01.webp",
    rating: 5,
    tag: "Live Workshop Alumni",
  },
  {
    quote:
      "Having 1-on-1 mentorship with Avyukt was worth 10x what I paid. He reviewed my actual repository, pointed out critical concurrency flaws, and gave me an actionable roadmap that transformed my career.",
    author: "Sneha KC",
    role: "Full-Stack Developer",
    company: "Software Labs",
    avatar: "/creators/team-04.webp",
    rating: 5,
    tag: "1-on-1 Mentorship",
  },
  {
    quote:
      "NepaliMentor’s design systems course taught me how staff designers structure production design tokens and atomic components. No other platform offers this level of practical depth in Nepal.",
    author: "Rohan Tamang",
    role: "Staff Product Designer",
    company: "Creative Studio",
    avatar: "/creators/team-02.webp",
    rating: 5,
    tag: "Course Bundle",
  },
]

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-4 overflow-hidden border-y border-zinc-800 bg-[#09090b] px-4 py-14 text-white shadow-2xl transition-colors sm:px-6 lg:px-10 lg:py-20"
    >
      {/* Atmospheric Animated Background Layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.08),transparent_70%)]" />
      <div className="animate-mesh-float pointer-events-none absolute -top-32 left-1/4 size-[450px] rounded-full bg-gradient-to-br from-white/10 via-zinc-400/5 to-transparent blur-3xl" />
      <div className="animate-mesh-float-reverse pointer-events-none absolute right-1/3 bottom-0 size-[400px] rounded-full bg-gradient-to-tl from-white/7 via-zinc-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_60%,transparent_100%)] [background-size:24px_24px] opacity-80" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-3 gap-1.5 border-white/20 bg-white/10 px-3 py-1 text-[11px] font-black tracking-widest text-white uppercase shadow-2xs backdrop-blur-xs"
          >
            <Sparkles className="size-3 text-white" />
            <span>COMMUNITY FEEDBACK</span>
          </Badge>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
            Trusted by Builders Across the Industry
          </h2>
          <p className="mt-2.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">
            Read authentic stories from developers, designers, and creators who
            accelerated their skills through NepaliMentor.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:shadow-2xl"
            >
              <div>
                {/* Top Rating & Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-3.5 fill-white text-white"
                      />
                    ))}
                  </div>
                  <span className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-bold text-zinc-300">
                    {t.tag}
                  </span>
                </div>

                {/* Quote */}
                <p className="mt-4 text-xs leading-relaxed text-zinc-200 sm:text-sm">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 flex items-center gap-3 border-t border-zinc-800/80 pt-4">
                <img
                  src={t.avatar}
                  alt={t.author}
                  loading="lazy"
                  className="size-10 rounded-full border border-zinc-700 object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">{t.author}</div>
                  <div className="text-[11px] text-zinc-400">
                    {t.role} •{" "}
                    <span className="font-medium text-zinc-200">
                      {t.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
