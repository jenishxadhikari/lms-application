import {
  Building2Icon,
  CalendarDaysIcon,
  Globe2Icon,
  ImageIcon,
  PaletteIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import type { Organization } from "../schema"

interface ViewDetailsProps {
  organization: Organization
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DetailRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-3 text-sm first:pt-0 last:pb-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="wrap-break-words min-w-0 font-medium text-foreground">
        {children}
      </dd>
    </div>
  )
}

function ColorValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl bg-muted/35 p-2 ring-1 ring-foreground/5">
      <div
        aria-hidden="true"
        className="h-9 rounded-lg shadow-xs ring-1 ring-black/10 dark:ring-white/10"
        style={{ backgroundColor: value }}
      />
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 px-1 pb-1">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span className="font-mono text-xs uppercase tabular-nums">
          {value}
        </span>
      </div>
    </div>
  )
}

export function ViewDetails({
  organization,
  open,
  onOpenChange,
}: ViewDetailsProps) {
  const createdDate = new Date(organization.createdDatetime)
  const formattedDate = Number.isNaN(createdDate.getTime())
    ? "Not available"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
        createdDate
      )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:duration-150 motion-reduce:transition-opacity motion-reduce:data-ending-style:translate-x-0 motion-reduce:data-starting-style:translate-x-0 md:min-w-2xl">
        <SheetHeader className="shrink-0 border-b bg-muted/20 px-6 py-6 pr-14">
          <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Organization details
          </p>
          <div className="flex items-center gap-4">
            {organization.logoUrl ? (
              <img
                src={organization.logoUrl}
                alt=""
                className="size-14 shrink-0 rounded-xl bg-background object-contain p-1.5 shadow-sm outline -outline-offset-1 outline-black/10 dark:outline-white/10"
              />
            ) : (
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
                <Building2Icon className="size-6" strokeWidth={1.75} />
              </span>
            )}
            <div className="min-w-0 space-y-1.5">
              <SheetTitle className="wrap-break-words text-xl leading-tight">
                {organization.name}
              </SheetTitle>
              <SheetDescription className="font-mono text-xs break-all">
                {organization.slug}
              </SheetDescription>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            <Badge
              variant="outline"
              className={
                organization.status === "ACTIVE"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : "bg-background text-muted-foreground"
              }
            >
              <span
                aria-hidden="true"
                className={
                  organization.status === "ACTIVE"
                    ? "size-1.5 rounded-full bg-emerald-500"
                    : "size-1.5 rounded-full bg-muted-foreground"
                }
              />
              {organization.status === "ACTIVE" ? "Active" : "Inactive"}
            </Badge>
            <Badge
              variant="outline"
              className="bg-background text-muted-foreground"
            >
              {organization.type === "SYSTEM" ? "System" : "Organization"}
            </Badge>
          </div>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-7">
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-semibold">About</h3>
              <p className="mt-2 text-sm leading-6 whitespace-pre-wrap text-muted-foreground">
                {organization.description || "No description provided."}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Globe2Icon className="size-4" strokeWidth={1.75} />
                </span>
                <h3 className="text-sm font-semibold">Workspace settings</h3>
              </div>
              <dl className="mt-4 divide-y divide-border">
                <DetailRow label="Time zone">{organization.timezone}</DetailRow>
                <DetailRow label="Currency">
                  {organization.currency.toUpperCase()}
                </DetailRow>
              </dl>
            </section>

            <section>
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <PaletteIcon className="size-4" strokeWidth={1.75} />
                </span>
                <h3 className="text-sm font-semibold">Branding</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <ColorValue label="Primary" value={organization.primaryColor} />
                <ColorValue
                  label="Secondary"
                  value={organization.secondaryColor}
                />
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-2xl bg-muted/35 p-2 ring-1 ring-foreground/5">
                {organization.faviconUrl ? (
                  <img
                    src={organization.faviconUrl}
                    alt=""
                    className="block size-10 shrink-0 rounded-lg bg-background object-contain p-1 outline -outline-offset-1 outline-black/10 dark:outline-white/10"
                  />
                ) : (
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground ring-1 ring-foreground/5">
                    <ImageIcon className="size-4" strokeWidth={1.75} />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium">Favicon</p>
                  <p className="text-xs text-muted-foreground">
                    {organization.faviconUrl
                      ? "Browser tab icon"
                      : "Not uploaded"}
                  </p>
                </div>
              </div>
            </section>

            <section className="border-t pt-6">
              <h3 className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                <CalendarDaysIcon className="size-3.5" strokeWidth={1.75} />
                Record details
              </h3>
              <dl className="mt-4 divide-y divide-border">
                <DetailRow label="Created">{formattedDate}</DetailRow>
                <DetailRow label="ID">
                  <span className="font-mono text-xs break-all">
                    {organization.id}
                  </span>
                </DetailRow>
              </dl>
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
