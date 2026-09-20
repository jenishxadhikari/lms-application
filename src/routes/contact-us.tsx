import { useState, type FormEvent } from "react"

import { createFileRoute, Link } from "@tanstack/react-router"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { FloatingThemeCustomizer } from "@/components/floating-theme-customizer"
import { HomeSidebar } from "@/components/sidebar/home-sidebar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const Route = createFileRoute("/contact-us")({
  component: ContactUsPage,
})

const INQUIRY_CATEGORIES = [
  "Course & Curriculum Inquiries",
  "Live Workshop Access",
  "1-on-1 Mentorship Guidance",
  "Billing & Account Support",
  "Instructor & Mentor Partnerships",
  "Other / General Inquiry",
]

const FAQS = [
  {
    q: "How soon do I receive access after enrolling in a course or workshop?",
    a: "Access is granted immediately upon successful payment or enrollment. You can view all your active programs in your learning dashboard.",
  },
  {
    q: "Can I reschedule or cancel a 1-on-1 mentorship session?",
    a: "Yes, mentorship sessions can be rescheduled up to 24 hours prior to the booked time slot directly from your mentorship workspace.",
  },
  {
    q: "How can I apply to become a course creator or mentor?",
    a: "Select 'Instructor & Mentor Partnerships' in the contact form or email creator@nepalimentor.com with your portfolio and expertise details.",
  },
  {
    q: "What payment methods are supported?",
    a: "We support major local and international payment methods including eSewa, Khalti, ConnectIPS, and international cards via Stripe.",
  },
]

function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    category: INQUIRY_CATEGORIES[0],
    subject: "",
    message: "",
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all required fields.")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      toast.success("Thank you! Your message has been sent successfully.")
    }, 600)
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <HomeSidebar />
      <SidebarInset className="!m-0 min-h-svh min-w-0">
        <SiteHeader />
        {/* Main Container */}
        <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-18">
          {/* Hero Section */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-gradient-to-b from-zinc-100 to-zinc-200/60 px-3 py-1 text-xs font-black tracking-wider text-zinc-900 shadow-2xs dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 dark:text-zinc-200">
              <Sparkles className="size-3.5" />
              <span className="uppercase">SUPPORT &amp; INQUIRIES</span>
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Get in touch with us
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Have questions about courses, live workshops, or 1-on-1
              mentorship? Our team is here to support your learning journey
              every step of the way.
            </p>
          </div>

          {/* 2-Column Content Grid */}
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left Form Column */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-8 lg:col-span-7">
              <div className="flex items-center gap-3 border-b border-border/60 pb-5">
                <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-gradient-to-b from-zinc-100 to-zinc-200/60 text-zinc-900 shadow-xs dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 dark:text-zinc-100">
                  <MessageSquare className="size-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-foreground">
                    Send a Message
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    We typically reply within 24 hours during business days.
                  </p>
                </div>
              </div>

              {isSuccess ? (
                <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
                  <CheckCircle2 className="mx-auto size-12 text-zinc-900 dark:text-white" />
                  <h3 className="mt-3 text-lg font-black text-foreground">
                    Message Sent Successfully
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                    Thank you for reaching out, {formData.fullName}. A member of
                    our support team will review your inquiry and follow up at{" "}
                    {formData.email}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false)
                      setFormData({
                        fullName: "",
                        email: "",
                        category: INQUIRY_CATEGORIES[0],
                        subject: "",
                        message: "",
                      })
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-gradient-to-b from-zinc-100 to-zinc-200/80 px-4 py-2 text-xs font-bold text-zinc-900 shadow-2xs transition-all hover:bg-zinc-900 hover:text-white dark:border-zinc-700 dark:bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-100 dark:hover:bg-white dark:hover:text-zinc-950"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="fullName"
                        className="text-xs font-bold tracking-wide text-foreground uppercase"
                      >
                        Your Name <span className="text-zinc-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Suman Sharma"
                        className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-2xs transition-colors placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-bold tracking-wide text-foreground uppercase"
                      >
                        Email Address <span className="text-zinc-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="name@example.com"
                        className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-2xs transition-colors placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="category"
                      className="text-xs font-bold tracking-wide text-foreground uppercase"
                    >
                      Inquiry Category
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground shadow-2xs transition-colors focus:border-foreground focus:outline-none"
                    >
                      {INQUIRY_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject"
                      className="text-xs font-bold tracking-wide text-foreground uppercase"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Brief description of your query"
                      className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-2xs transition-colors placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs font-bold tracking-wide text-foreground uppercase"
                    >
                      Message <span className="text-zinc-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Provide details about your question, course enrollment, or mentorship request..."
                      className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground shadow-2xs transition-colors placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-gradient-to-b from-zinc-100 to-zinc-200/80 px-5 text-sm font-bold text-zinc-900 shadow-xs transition-all hover:bg-zinc-900 hover:text-white disabled:opacity-50 dark:border-zinc-700 dark:bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-100 dark:hover:bg-white dark:hover:text-zinc-950"
                  >
                    <Send className="size-4" />
                    <span>
                      {isSubmitting ? "Sending message..." : "Send Message"}
                    </span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Info Cards Column */}
            <div className="space-y-4 lg:col-span-5">
              {/* Quick Contact Card */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
                <h3 className="text-base font-black text-foreground">
                  Contact Channels
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Direct channels for support, partnerships, and technical
                  assistance.
                </p>

                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/60 text-foreground">
                      <Mail className="size-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-black tracking-wider text-muted-foreground uppercase">
                        Email Support
                      </span>
                      <a
                        href="mailto:support@nepalimentor.com"
                        className="text-sm font-bold text-foreground hover:underline"
                      >
                        support@nepalimentor.com
                      </a>
                      <span className="block text-[11px] text-muted-foreground">
                        Response within 24 hours
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/60 text-foreground">
                      <MapPin className="size-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-black tracking-wider text-muted-foreground uppercase">
                        Headquarters
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        Kathmandu, Nepal
                      </span>
                      <span className="block text-[11px] text-muted-foreground">
                        Digital Hub &amp; Creative Studio
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/60 text-foreground">
                      <Clock className="size-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-black tracking-wider text-muted-foreground uppercase">
                        Working Hours
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        Sun – Fri, 9:00 AM – 6:00 PM NPT
                      </span>
                      <span className="block text-[11px] text-muted-foreground">
                        Online support desk available
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Catalog Shortcuts Card */}
              <div className="rounded-2xl border border-border/80 bg-gradient-to-b from-zinc-100/70 to-card p-6 shadow-xs dark:from-zinc-900/40 dark:to-card">
                <h3 className="text-base font-black text-foreground">
                  Looking for Programs?
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Browse our active learning offerings directly:
                </p>

                <div className="mt-4 space-y-2">
                  <Link
                    to="/"
                    hash="courses"
                    className="flex items-center justify-between rounded-lg border border-border/70 bg-card p-3 text-xs font-bold text-foreground transition-all hover:bg-muted"
                  >
                    <span>All Courses</span>
                    <ArrowRight className="size-3.5 text-muted-foreground" />
                  </Link>

                  <Link
                    to="/"
                    hash="workshop"
                    className="flex items-center justify-between rounded-lg border border-border/70 bg-card p-3 text-xs font-bold text-foreground transition-all hover:bg-muted"
                  >
                    <span>Live Workshops &amp; Mentorships</span>
                    <ArrowRight className="size-3.5 text-muted-foreground" />
                  </Link>

                  <Link
                    to="/"
                    hash="bundles"
                    className="flex items-center justify-between rounded-lg border border-border/70 bg-card p-3 text-xs font-bold text-foreground transition-all hover:bg-muted"
                  >
                    <span>Course Bundles</span>
                    <ArrowRight className="size-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="mt-16 border-t border-border/80 pt-12 sm:pt-16">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-gradient-to-b from-zinc-100 to-zinc-200/60 text-zinc-900 shadow-xs dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 dark:text-zinc-100">
                <HelpCircle className="size-4" />
              </div>
              <div>
                <span className="block text-[11px] font-black tracking-widest text-muted-foreground uppercase">
                  FREQUENTLY ASKED
                </span>
                <h2 className="text-xl font-black text-foreground sm:text-2xl">
                  Quick Answers
                </h2>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {FAQS.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border/80 bg-card p-5 shadow-xs"
                >
                  <h4 className="text-sm font-bold text-foreground">{faq.q}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>

        <SiteFooter />
        <FloatingThemeCustomizer />
      </SidebarInset>
    </SidebarProvider>
  )
}
