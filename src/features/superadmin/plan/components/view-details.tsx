import { CreditCardIcon, PackageIcon, UsersRoundIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import type { Plan } from "../schema"

interface ViewDetailsProps {
  plan: Plan
  open: boolean
  onOpenChange: (open: boolean) => void
}

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
})

function DetailRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 py-3 text-sm first:pt-0 last:pb-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-right font-medium text-foreground tabular-nums">
        {children}
      </dd>
    </div>
  )
}

export function ViewDetails({ plan, open, onOpenChange }: ViewDetailsProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:duration-150 motion-reduce:transition-opacity motion-reduce:data-ending-style:translate-x-0 motion-reduce:data-starting-style:translate-x-0 md:min-w-2xl">
        <SheetHeader className="shrink-0 border-b bg-muted/20 px-6 py-6 pr-14">
          <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Plan details
          </p>
          <div className="flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
              <PackageIcon className="size-6" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 space-y-1.5">
              <SheetTitle className="wrap-break-words text-xl leading-tight">
                {plan.name}
              </SheetTitle>
              <SheetDescription className="font-mono text-xs break-all">
                {plan.code}
              </SheetDescription>
            </div>
          </div>
          <div className="pt-4">
            <Badge
              variant="outline"
              className={cn(
                "gap-1.5 font-normal",
                plan.isActive
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : "bg-muted/50 text-muted-foreground"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 rounded-full",
                  plan.isActive ? "bg-emerald-500" : "bg-muted-foreground"
                )}
              />
              {plan.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-7">
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <UsersRoundIcon className="size-4" strokeWidth={1.75} />
                </span>
                <h3 className="text-sm font-semibold">Usage limits</h3>
              </div>
              <dl className="mt-4 divide-y divide-border">
                <DetailRow label="Students">
                  {plan.maxStudents.toLocaleString()}
                </DetailRow>
                <DetailRow label="Mentors">
                  {plan.maxMentors.toLocaleString()}
                </DetailRow>
                <DetailRow label="Courses">
                  {plan.maxCourses.toLocaleString()}
                </DetailRow>
                <DetailRow label="Storage">
                  {plan.storageGB.toLocaleString()} GB
                </DetailRow>
              </dl>
            </section>

            <section>
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <CreditCardIcon className="size-4" strokeWidth={1.75} />
                </span>
                <h3 className="text-sm font-semibold">Pricing</h3>
              </div>
              <dl className="mt-4 divide-y divide-border">
                <DetailRow label="Monthly">
                  {currency.format(plan.priceMonthly)}
                </DetailRow>
                <DetailRow label="Yearly">
                  {currency.format(plan.priceYearly)}
                </DetailRow>
              </dl>
            </section>

            <section className="border-t pt-6">
              <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Record details
              </h3>
              <dl className="mt-4 divide-y divide-border">
                <DetailRow label="ID">
                  <span className="font-mono text-xs break-all">{plan.id}</span>
                </DetailRow>
              </dl>
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
