import { Link } from "@tanstack/react-router"
import { GalleryVerticalEnd } from "lucide-react"

import { buttonVariants } from "./ui/button"

export function NotFound() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Nepali Mentor
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm space-y-4 text-center md:max-w-fit">
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Page Not Found
            </h1>
            <p className="text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <Link to="/" className={buttonVariants()}>
              Back to home page
            </Link>
          </div>
        </div>
      </div>
      <div
        className="relative hidden min-h-160 overflow-hidden bg-cover bg-center lg:block"
        style={{ backgroundImage: "url('/not-found.png')" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(160deg,color-mix(in_srgb,var(--foreground)_25%,transparent),color-mix(in_srgb,var(--foreground)_50%,transparent)_45%,color-mix(in_srgb,var(--primary)_52%,transparent))] dark:bg-[linear-gradient(160deg,color-mix(in_srgb,var(--background)_25%,transparent),color-mix(in_srgb,var(--background)_50%,transparent)_45%,color-mix(in_srgb,var(--primary)_52%,transparent))]" />
      </div>
    </div>
  )
}
