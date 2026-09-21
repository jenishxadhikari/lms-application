import {
  BookOpenIcon,
  CalendarDaysIcon,
  CalendarRangeIcon,
  CreditCardIcon,
  GraduationCapIcon,
  HardDriveIcon,
  PackageIcon,
  UserRoundCheckIcon,
} from "lucide-react"

import { currency } from "@/lib/helper"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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

export function ViewDetails({ plan, open, onOpenChange }: ViewDetailsProps) {
  const limits = [
    {
      label: "Students",
      value: plan.maxStudents.toLocaleString(),
      icon: GraduationCapIcon,
    },
    {
      label: "Mentors",
      value: plan.maxMentors.toLocaleString(),
      icon: UserRoundCheckIcon,
    },
    {
      label: "Courses",
      value: plan.maxCourses.toLocaleString(),
      icon: BookOpenIcon,
    },
    {
      label: "Storage",
      value: `${plan.storageGB.toLocaleString()} GB`,
      icon: HardDriveIcon,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="data-[side=right]:w-full data-[side=right]:sm:max-w-2xl">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="shrink-0 border-b bg-muted/20 px-1 py-2 sm:px-2">
            <SheetHeader>
              <div className="pr-10">
                <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Plan details
                </p>
                <div className="flex min-w-0 items-center gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/10">
                    <PackageIcon className="size-6" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 space-y-1.5">
                    <div className="text-xl leading-tight wrap-break-word">
                      <SheetTitle>{plan.name}</SheetTitle>
                    </div>
                    <SheetDescription>
                      <span className="font-mono text-xs break-all">
                        {plan.code}
                      </span>
                    </SheetDescription>
                  </div>
                </div>
                <div className="pt-4">
                  <Badge variant={plan.isActive ? "outline" : "secondary"}>
                    <span
                      aria-hidden="true"
                      className={
                        plan.isActive
                          ? "size-1.5 rounded-full bg-emerald-500"
                          : "size-1.5 rounded-full bg-muted-foreground"
                      }
                    />
                    {plan.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-muted/15 px-5 py-6 sm:px-6">
            <div className="space-y-4">
              <Card size="sm">
                <CardHeader>
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <CreditCardIcon className="size-4" strokeWidth={2} />
                    </span>
                    <h3 className="text-sm font-semibold">Pricing</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDaysIcon
                          aria-hidden="true"
                          className="size-4"
                          strokeWidth={1.5}
                        />
                        Monthly
                      </div>
                      <p className="mt-2 text-2xl font-semibold tracking-tight break-all tabular-nums">
                        {currency.format(plan.priceMonthly)}
                        <span className="ml-1 text-xs text-muted-foreground">
                          / month
                        </span>
                      </p>
                    </div>
                    <div className="min-w-0 border-t pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarRangeIcon
                          aria-hidden="true"
                          className="size-4"
                          strokeWidth={1.5}
                        />
                        Yearly
                      </div>
                      <p className="mt-2 text-2xl font-semibold tracking-tight break-all tabular-nums">
                        {currency.format(plan.priceYearly)}
                        <span className="ml-1 text-xs text-muted-foreground">
                          / year
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <section className="space-y-3 pt-2">
                <h3 className="px-1 text-sm font-semibold">Usage limits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {limits.map(({ label, value, icon: Icon }) => (
                    <Card key={label} size="sm">
                      <CardContent className="flex-row items-center">
                        <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Icon
                            aria-hidden="true"
                            className="size-4"
                            strokeWidth={1.5}
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xl font-semibold tracking-tight break-all tabular-nums sm:text-2xl">
                            {value}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {label}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
