import { Link } from "@tanstack/react-router"
import { GalleryVerticalEnd } from "lucide-react"

export function AuthWrapper({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="grid min-h-svh min-w-0 lg:grid-cols-2" {...props}>
      <div className="flex min-w-0 flex-col gap-4 p-4 sm:p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Nepali Mentor
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-6 sm:py-8">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div
        className="relative hidden min-h-160 overflow-hidden bg-cover bg-center lg:block"
        style={{ backgroundImage: "url('/auth.jpg')" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(15,23,42,0.92),rgba(15,23,42,0.72)_45%,color-mix(in_srgb,var(--color-primary)_52%,transparent))]" />
        <div className="relative flex h-full flex-col justify-end p-10 text-white">
          <span className="mb-4 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black uppercase backdrop-blur">
            Public learning platform
          </span>
          <h2 className="max-w-md text-3xl leading-tight font-black">
            Learn through practical courses, live workshops, and guided
            mentorship.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
            One account connects your catalog discovery, purchases, and student
            workspace.
          </p>
        </div>
      </div>
    </div>
  )
}
