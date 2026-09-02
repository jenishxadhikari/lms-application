import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

interface SubmitButtonProps {
  pending: boolean
  label: string
  className?: string
  form?: string
}

export function SubmitButton({
  pending,
  label,
  className,
  form,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={cn("w-full", className)}
      disabled={pending}
      form={form}
    >
      {pending && <Spinner />} {label}
    </Button>
  )
}
