import {
  Building2Icon,
  CalendarDaysIcon,
  Globe2Icon,
  ImageIcon,
  PaletteIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { formatDate } from "@/lib/helper"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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

export function ViewDetails({
  organization,
  open,
  onOpenChange,
}: ViewDetailsProps) {
  const createdDate = formatDate(organization.createdDatetime)
  const system = organization.type === "SYSTEM"
  const active = organization.status === "ACTIVE"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="data-[side=right]:w-full data-[side=right]:sm:max-w-2xl">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="shrink-0 border-b bg-muted/20 px-1 py-2 sm:px-2">
            <SheetHeader>
              <div className="pr-10">
                <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Organization details
                </p>
                <div className="flex min-w-0 items-center gap-4">
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
                    <div className="text-xl leading-tight wrap-break-word">
                      <SheetTitle>{organization.name}</SheetTitle>
                    </div>
                    <SheetDescription>
                      <span className="font-mono text-xs break-all">
                        {organization.slug}
                      </span>
                    </SheetDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  <Badge variant={active ? "outline" : "secondary"}>
                    <span
                      aria-hidden="true"
                      className={
                        active
                          ? "size-1.5 rounded-full bg-emerald-500"
                          : "size-1.5 rounded-full bg-muted-foreground"
                      }
                    />
                    {active ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant="outline">
                    {system ? <ShieldCheckIcon /> : <Building2Icon />}
                    {system ? "System" : "Organization"}
                  </Badge>
                  <Badge variant="outline">
                    <CalendarDaysIcon /> {createdDate}
                  </Badge>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-muted/15 px-5 py-6 sm:px-6">
            <div className="space-y-4">
              <Card size="sm">
                <CardHeader>
                  <h3 className="text-sm font-semibold">About</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 whitespace-pre-wrap text-muted-foreground">
                    {organization.description || "No description provided."}
                  </p>
                </CardContent>
              </Card>

              <Card size="sm">
                <CardHeader>
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/10">
                      <Globe2Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <h3 className="text-sm font-semibold">
                      Workspace settings
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <dl className="divide-y divide-border">
                    <div className="grid grid-cols-[minmax(6rem,0.4fr)_minmax(0,1fr)] gap-3 pb-3 text-sm">
                      <dt className="text-muted-foreground">Time zone</dt>
                      <dd className="wrap-break-words min-w-0 text-right font-medium">
                        {organization.timezone}
                      </dd>
                    </div>
                    <div className="grid grid-cols-[minmax(6rem,0.4fr)_minmax(0,1fr)] gap-3 pt-3 text-sm">
                      <dt className="text-muted-foreground">Currency</dt>
                      <dd className="min-w-0 text-right font-medium tabular-nums">
                        {organization.currency.toUpperCase()}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card size="sm">
                <CardHeader>
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/10">
                      <PaletteIcon className="size-4" strokeWidth={1.75} />
                    </span>
                    <h3 className="text-sm font-semibold">Branding</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <figure className="min-w-0 rounded-xl bg-muted/40 p-2">
                      <div
                        aria-hidden="true"
                        className="h-10 rounded-md shadow-xs ring-1 ring-black/10 dark:ring-white/10"
                        style={{ backgroundColor: organization.primaryColor }}
                      />
                      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 px-1 pt-2 pb-0.5">
                        <span className="text-xs text-muted-foreground">
                          Primary
                        </span>
                        <span className="font-mono text-xs uppercase tabular-nums">
                          {organization.primaryColor}
                        </span>
                      </figcaption>
                    </figure>
                    <figure className="min-w-0 rounded-xl bg-muted/40 p-2">
                      <div
                        aria-hidden="true"
                        className="h-10 rounded-md shadow-xs ring-1 ring-black/10 dark:ring-white/10"
                        style={{ backgroundColor: organization.secondaryColor }}
                      />
                      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 px-1 pt-2 pb-0.5">
                        <span className="text-xs text-muted-foreground">
                          Secondary
                        </span>
                        <span className="font-mono text-xs uppercase tabular-nums">
                          {organization.secondaryColor}
                        </span>
                      </figcaption>
                    </figure>
                  </div>
                  <Separator />
                  <div className="flex min-w-0 items-center gap-3">
                    {organization.faviconUrl ? (
                      <img
                        src={organization.faviconUrl}
                        alt=""
                        className="block size-10 shrink-0 rounded-lg bg-background object-contain p-1 outline -outline-offset-1 outline-black/10 dark:outline-white/10"
                      />
                    ) : (
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
