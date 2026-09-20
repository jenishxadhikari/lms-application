import { useState } from "react"

import { ChevronDown, HelpCircle } from "lucide-react"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"

interface FaqItem {
  question: string
  answer: string
  category: string
}

const FAQS: FaqItem[] = [
  {
    category: "Mentorship",
    question: "How do 1-on-1 mentorship sessions work?",
    answer:
      "When you book a 1-on-1 session, you can choose an available calendar time slot with your mentor. Before the call, you can submit your GitHub repository, architecture diagram, or specific questions so your mentor comes fully prepared with targeted feedback and solutions.",
  },
  {
    category: "Workshops",
    question: "Are live workshop sessions recorded if I miss one?",
    answer:
      "Yes, absolutely. All live cohort sessions are recorded in high definition and automatically uploaded to your student dashboard within a few hours. You have lifetime access to rewatch the recordings and reference the lecture notes anytime.",
  },
  {
    category: "Courses",
    question: "Do I receive a certificate upon completion?",
    answer:
      "Yes. Once you complete all modules and submit your capstone project, you will receive a verifiable digital credential that you can showcase on LinkedIn, GitHub, or your personal resume.",
  },
  {
    category: "Payments",
    question: "What payment methods are accepted in Nepal and globally?",
    answer:
      "We accept major domestic payment systems including eSewa, Khalti, ConnectIPS, and mobile banking, as well as international debit/credit cards for students and professionals joining from abroad.",
  },
  {
    category: "Community",
    question: "Can I ask questions outside of live sessions?",
    answer:
      "Yes! Enrolling in any course, workshop, or bundle gives you access to the private NepaliMentor Discord / Slack channels where instructors, teaching assistants, and fellow builders collaborate daily.",
  },
  {
    category: "Bundles",
    question: "What is the benefit of buying a Course Bundle?",
    answer:
      "Bundles package multiple related courses (e.g. Frontend to Backend, or Full-Stack Architecture) at a substantial discount (often 20% to 40% off individual prices). You get comprehensive learning paths with one simple checkout.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section
      id="faq"
      className="relative scroll-mt-4 overflow-hidden border-t border-zinc-800 bg-[#09090b] px-4 py-10 text-white shadow-2xl transition-colors sm:px-6 sm:py-14 lg:px-10 lg:py-20"
    >
      {/* Atmospheric Animated Background Layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.08),transparent_70%)]" />
      <div className="animate-mesh-float pointer-events-none absolute -top-32 left-1/3 size-[420px] rounded-full bg-gradient-to-br from-white/10 via-zinc-400/5 to-transparent blur-3xl" />
      <div className="animate-mesh-float-reverse pointer-events-none absolute right-1/4 bottom-0 size-[380px] rounded-full bg-gradient-to-tl from-white/7 via-zinc-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_60%,transparent_100%)] [background-size:24px_24px] opacity-80" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-3 gap-1.5 border-white/20 bg-white/10 px-3 py-1 text-[11px] font-black tracking-widest text-white uppercase shadow-2xs backdrop-blur-xs"
          >
            <HelpCircle className="size-3 text-white" />
            <span>GOT QUESTIONS?</span>
          </Badge>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">
            Everything you need to know about our courses, workshops, 1-on-1
            mentorships, and learning platform.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-7 space-y-3 sm:mt-10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 shadow-xl transition-all duration-200 hover:border-zinc-700"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full cursor-pointer items-start justify-between gap-3 p-4 text-left font-bold text-white transition-colors select-none sm:items-center sm:gap-4 sm:p-5"
                  aria-expanded={isOpen}
                >
                  <div className="flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <span className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-black tracking-wide text-zinc-300 uppercase">
                      {faq.category}
                    </span>
                    <span className="text-sm leading-snug font-bold text-white sm:text-base">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-zinc-400 transition-transform duration-300",
                      isOpen && "rotate-180 text-white"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-zinc-800/80 px-5 pt-3 pb-5 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
