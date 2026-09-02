import { BadgeCheck } from "lucide-react"

import { Alert, AlertTitle } from "@/components/ui/alert"

interface SuccessAlertProps {
  message: string
}

export function SuccessAlert({ message }: SuccessAlertProps) {
  return (
    <Alert variant="default" className="border-none bg-green-500/10">
      <BadgeCheck className="size-4 text-green-500!" />
      <AlertTitle className="flex">{message}</AlertTitle>
    </Alert>
  )
}
