import { OctagonAlert } from "lucide-react"

import { Alert, AlertTitle } from "@/components/ui/alert"

interface ErrorAlertProps {
  message: string
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Alert className="border-none bg-destructive/10">
      <OctagonAlert className="size-4 text-destructive!" />
      <AlertTitle className="flex">{message}</AlertTitle>
    </Alert>
  )
}
