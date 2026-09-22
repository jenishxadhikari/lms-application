import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Clock3Icon, RefreshCwIcon, ShieldCheckIcon } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { CopyButton } from "@/components/copy-button"

import { verifyDomain } from "../api"
import type { Domain } from "../schema"

interface VerifyDomainProps {
  domain: Domain
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VerifyDomain({
  domain,
  open,
  onOpenChange,
}: VerifyDomainProps) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({ mutationFn: verifyDomain })

  function onVerify() {
    mutate(domain.id, {
      onSuccess: () => {
        toast.success("Domain verified successfully.")
        queryClient.invalidateQueries({ queryKey: ["domains"] })
        onOpenChange(false)
      },
      onError: (error) => toast.error(error.message),
    })
  }

  const records = [
    { label: "Type", value: "TXT" },
    {
      label: "Name",
      value: domain.verificationRecordName,
      copyLabel: "Name",
    },
    {
      label: "Value",
      value: domain.verificationRecordValue,
      copyLabel: "Value",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col sm:max-w-sm md:max-w-2xl">
        <div className="shrink-0 pr-8">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/10">
                <ShieldCheckIcon className="size-5" strokeWidth={2} />
              </div>
              <div className="space-y-1.5 text-xl">
                <DialogTitle>Verify custom domain</DialogTitle>
                <DialogDescription>
                  Publish one DNS record to prove that you own this domain.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Domain
              </p>
              <p className="mt-1 text-base font-medium break-all text-foreground">
                {domain.domain}
              </p>
            </div>
            <div className="flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-900/70">
              <span className="size-1.5 rounded-full bg-amber-500" />
              Pending verification
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-foreground">DNS record</h3>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              Add these exact values at your DNS provider.
            </p>
          </div>

          <dl className="mt-3 overflow-hidden rounded-xl border bg-background">
            {records.map((record, index) => (
              <div
                key={record.label}
                className={cn(
                  "grid min-h-18 grid-cols-[4rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 px-4 py-3.5 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:gap-x-4 sm:px-5",
                  index > 0 && "border-t"
                )}
              >
                <dt className="text-sm font-medium text-muted-foreground">
                  {record.label}
                </dt>
                <dd
                  className={cn(
                    "min-w-0 font-mono text-sm leading-5 break-all text-foreground",
                    record.label === "Type" &&
                      "w-fit rounded-md bg-primary/10 px-2 py-1 font-sans text-xs font-semibold text-primary",
                    !record.value && "font-sans text-muted-foreground"
                  )}
                >
                  {record.value || "Not available"}
                </dd>
                {record.copyLabel && (
                  <div className="col-start-2 justify-self-start sm:col-start-3 sm:row-start-1 sm:justify-self-end">
                    <CopyButton label={record.copyLabel} value={record.value} />
                  </div>
                )}
              </div>
            ))}
          </dl>

          <div className="mt-5 flex items-start gap-3 rounded-lg bg-muted/50 px-4 py-3 text-muted-foreground">
            <Clock3Icon
              className="mt-0.5 size-4 shrink-0"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="text-sm leading-5">
              DNS changes can take a few minutes—or occasionally longer—to
              become publicly visible.
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={isPending} />
              }
            >
              Close
            </DialogClose>
            <Button type="button" disabled={isPending} onClick={onVerify}>
              {isPending ? <Spinner /> : <RefreshCwIcon />}
              {isPending ? "Verifying…" : "Verify domain"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
