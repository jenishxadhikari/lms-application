import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SubmitButton } from "@/components/submit-button"

interface FormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactElement
  isPending: boolean
  children: React.ReactNode
  icon: LucideIcon
  title: string
  description: string
  buttonLabel: string
  formId: string
}

export function FormDialog({
  open,
  onOpenChange,
  trigger,
  isPending,
  children,
  icon: Icon,
  title,
  description,
  buttonLabel,
  formId,
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger render={trigger} />}
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden p-0 shadow-xl duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:duration-0 sm:max-w-sm md:max-h-[min(82dvh,48rem)] md:max-w-2xl data-closed:duration-150">
        <div className="flex min-h-0 flex-1 flex-col">
          <DialogHeader className="shrink-0 border-b px-5 py-5 pr-14 sm:px-6 sm:pr-14">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/10">
                <Icon className="size-5" />
              </div>
              <div className="space-y-1.5">
                <DialogTitle className="text-xl">{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-6">
            {children}
          </div>
          <DialogFooter className="shrink-0 border-t bg-muted/20 px-5 py-4 sm:px-6">
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              }
            />
            <SubmitButton
              label={buttonLabel}
              pending={isPending}
              className="sm:w-fit"
              form={formId}
            />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
