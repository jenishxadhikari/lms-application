import { useEffect, useState } from "react"

import { useAuth } from "@/auth"
import { Link } from "@tanstack/react-router"
import { ArrowRight, Menu, Search, X } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { UserDropdown } from "@/components/user-dropdown"

export const SITE_NAV_ITEMS = [
  {
    title: "Courses",
    url: "/#courses",
  },
  {
    title: "Workshop",
    url: "/#workshop",
  },
  {
    title: "Mentorship",
    url: "/#mentorship",
    badge: "1-on-1",
  },
  {
    title: "Marketplace",
    url: "/#marketplace",
  },
  {
    title: "Blog",
    url: "/#blog",
  },
  {
    title: "Contact Us",
    url: "/contact-us",
  },
]

export function SiteNavbarLinks() {
  const { open, openMobile } = useSidebar()

  if (open || openMobile) {
    return null
  }

  return (
    <>
      <Separator
        orientation="vertical"
        className="mr-1 hidden h-5 min-[1700px]:block"
      />
      <nav
        className="hidden items-center gap-1 min-[1700px]:flex"
        aria-label="Main navigation"
      >
        {SITE_NAV_ITEMS.map((item) => (
          <a
            key={item.title}
            href={item.url}
            className="homepage-navbar-link inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold text-foreground/85"
          >
            <span>{item.title}</span>
            {item.badge && (
              <span className="rounded-full border border-white/20 bg-black px-1.5 py-0.5 text-[10px] font-bold text-white uppercase">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>
    </>
  )
}

const SEARCH_PROMPTS = [
  "Search courses...",
  "Search workshops...",
  "Search mentorship...",
  "Search marketplace...",
]

export function AnimatedNavbarSearch() {
  const [promptIndex, setPromptIndex] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const prompt = SEARCH_PROMPTS[promptIndex]

  useEffect(() => {
    let delay = isDeleting ? 45 : 80

    if (!isDeleting && characterCount === prompt.length) {
      delay = 1400
    } else if (isDeleting && characterCount === 0) {
      delay = 300
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting && characterCount === prompt.length) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && characterCount === 0) {
        setIsDeleting(false)
        setPromptIndex((current) => (current + 1) % SEARCH_PROMPTS.length)
        return
      }

      setCharacterCount((current) => current + (isDeleting ? -1 : 1))
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [characterCount, isDeleting, prompt])

  return (
    <label className="group hidden h-9.5 w-56 items-center gap-2.5 rounded-lg border border-black/40 bg-white/90 px-3.5 text-sm text-zinc-950 shadow-xs transition-[width,background-color,border-color,box-shadow,transform] duration-300 ease-out focus-within:w-72 focus-within:border-black/80 focus-within:bg-white focus-within:shadow-[0_8px_22px_rgba(0,0,0,0.16)] focus-within:ring-2 focus-within:ring-black/15 hover:-translate-y-0.5 hover:border-black/70 hover:bg-white hover:shadow-[0_7px_18px_rgba(0,0,0,0.14)] lg:flex xl:w-72 xl:focus-within:w-80 2xl:w-80 2xl:focus-within:w-96 dark:border-white/20 dark:bg-white/5 dark:text-white dark:focus-within:border-white/40 dark:focus-within:bg-white/10 dark:focus-within:shadow-[0_8px_24px_rgba(0,0,0,0.4)] dark:focus-within:ring-white/15 dark:hover:border-white/35 dark:hover:bg-white/10 dark:hover:shadow-[0_7px_20px_rgba(0,0,0,0.35)]">
      <Search className="size-4 shrink-0 text-black opacity-80 transition-[color,opacity,transform] duration-300 group-focus-within:scale-110 group-focus-within:opacity-100 group-hover:scale-110 group-hover:rotate-[-6deg] group-hover:opacity-100 dark:text-white dark:opacity-70" />
      <span className="sr-only">Search courses</span>
      <input
        type="search"
        aria-label="Search courses, workshops, mentorship, and marketplace"
        placeholder={prompt.slice(0, characterCount)}
        className="w-full bg-transparent text-sm text-black outline-none placeholder:text-sm placeholder:font-medium placeholder:text-black/75 placeholder:transition-colors group-focus-within:placeholder:text-black group-hover:placeholder:text-black dark:text-white dark:placeholder:text-white/70 dark:group-focus-within:placeholder:text-white dark:group-hover:placeholder:text-white"
      />
    </label>
  )
}

export function SiteHeader() {
  const { isAuthenticated } = useAuth()
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true)

  return (
    <>
      {isAnnouncementVisible && (
        <aside
          className="relative flex min-h-9 shrink-0 items-center justify-center border-b border-zinc-800 bg-black px-9 py-1 text-center text-[clamp(0.5rem,2.65vw,0.6875rem)] leading-none font-semibold whitespace-nowrap text-white sm:px-11 sm:text-sm sm:leading-snug"
          aria-label="Announcement"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-black tracking-wider text-white uppercase">
              UPDATE
            </span>
            <p className="text-xs font-semibold text-white sm:text-sm">
              New learning releases, workshops, and 1-on-1 mentorship slots are
              now live.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAnnouncementVisible(false)}
            className="absolute right-1.5 inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none sm:right-4"
            aria-label="Dismiss announcement"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </aside>
      )}

      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-1.5 border-b border-border bg-background px-2 text-foreground transition-[width,height] ease-linear sm:h-16 sm:gap-3 sm:px-4 lg:px-5">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
          <SidebarTrigger className="size-8 shrink-0 sm:-ml-1 sm:size-9">
            <Menu className="size-5" />
          </SidebarTrigger>

          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 transition-opacity hover:opacity-90"
            aria-label="NepaliMentor home"
          >
            <img
              src="/logo-light.png"
              alt="NepaliMentor"
              className="h-7 w-auto max-w-[112px] object-contain transition-transform duration-200 hover:scale-[1.02] sm:h-9 sm:max-w-[150px] dark:hidden"
            />
            <img
              src="/logo.png"
              alt="NepaliMentor"
              className="hidden h-7 w-auto max-w-[112px] object-contain transition-transform duration-200 hover:scale-[1.02] sm:h-9 sm:max-w-[150px] dark:block"
            />
          </Link>

          <SiteNavbarLinks />
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <AnimatedNavbarSearch />

          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/sign-in"
                className="hidden h-9 items-center justify-center rounded-md px-3 text-sm font-semibold text-foreground/85 transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
              >
                Sign in
              </Link>
              <Link
                to="/sign-up"
                className="inline-flex h-8 items-center justify-center gap-1 rounded-md bg-primary px-2.5 text-xs font-bold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 active:scale-95 sm:h-9 sm:gap-1.5 sm:px-4 sm:text-sm"
              >
                <span>Sign up</span>
                <ArrowRight className="hidden size-3.5 sm:block" />
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
