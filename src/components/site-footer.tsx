import { Link } from "@tanstack/react-router"
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/80 bg-zinc-950 text-zinc-300 dark:border-zinc-800 dark:bg-black">
      {/* Subtle top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-500/40 to-transparent" />

      {/* Main Navigation Columns */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Col 1: Brand & Bio (4 cols on lg) */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-90"
              aria-label="NepaliMentor home"
            >
              <img
                src="/logo.png"
                alt="NepaliMentor"
                className="h-8 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 text-xs leading-relaxed text-zinc-400 sm:text-sm">
              NepaliMentor empowers builders, creators, and professionals with
              practical programming, design systems, 3D animation, live
              expert-led workshops, and 1-on-1 personalized mentorship.
            </p>

            {/* Platform Status Badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-40" />
                <span className="relative inline-flex size-2 rounded-full bg-white" />
              </span>
              <span className="font-semibold">All Systems Operational</span>
            </div>

            {/* Location / Meta */}
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
              <MapPin className="size-3.5 shrink-0" />
              <span>Kathmandu, Nepal &bull; Global Learning</span>
            </div>
          </div>

          {/* Col 2: Programs & Learning (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black tracking-wider text-white uppercase">
              Programs
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <a
                  href="/#courses"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  All Courses
                </a>
              </li>
              <li>
                <a
                  href="/#workshop"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Live Workshops
                </a>
              </li>
              <li>
                <a
                  href="/#mentorship"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  1-on-1 Mentorship
                </a>
              </li>
              <li>
                <a
                  href="/#bundles"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Course Bundles
                </a>
              </li>
              <li>
                <a
                  href="/#courses"
                  className="inline-flex items-center gap-1 text-zinc-400 transition-colors hover:text-white"
                >
                  <span>Browse Catalog</span>
                  <ArrowRight className="size-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Journal (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black tracking-wider text-white uppercase">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link
                  to="/contact-us"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  About Us &amp; Support
                </Link>
              </li>
              <li>
                <a
                  href="/#blogs"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Learning Journal
                </a>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Become an Instructor
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Account (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black tracking-wider text-white uppercase">
              Support
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link
                  to="/contact-us"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Help Desk &amp; FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-in"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Student Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-up"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@nepalimentor.com"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Email Support
                </a>
              </li>
              <li>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <ShieldCheck className="size-3.5 text-white" />
                  <span>Verified Mentors</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 5: Connect & Community (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black tracking-wider text-white uppercase">
              Community
            </h4>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
                aria-label="Twitter / X"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-3.5"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-3.5"
                  fill="currentColor"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>

            <div className="mt-5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3 text-[11px] text-zinc-400">
              <span className="block font-bold text-white">
                Need immediate help?
              </span>
              <p className="mt-1">
                Reach us via email:{" "}
                <a
                  href="mailto:support@nepalimentor.com"
                  className="font-semibold text-zinc-200 hover:underline"
                >
                  support@nepalimentor.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer / Legal Bar */}
      <div className="border-t border-zinc-800/80 bg-zinc-950 px-4 py-6 sm:px-6 lg:px-10 dark:bg-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-zinc-500 sm:flex-row">
          <p className="order-2 sm:order-1">
            &copy; {new Date().getFullYear()} NepaliMentor Platform. All rights
            reserved.
          </p>

          <div className="order-1 flex flex-wrap items-center gap-x-5 gap-y-2 sm:order-2">
            <Link
              to="/contact-us"
              className="transition-colors hover:text-zinc-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact-us"
              className="transition-colors hover:text-zinc-300"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact-us"
              className="transition-colors hover:text-zinc-300"
            >
              Refund Policy
            </Link>
            <Link
              to="/contact-us"
              className="transition-colors hover:text-zinc-300"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
