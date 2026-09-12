import { useMutation } from "@tanstack/react-query"
import { RefreshCwIcon } from "lucide-react"
import { toast } from "sonner"
import type z from "zod"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { resendOtp } from "../api"
import type { resendOtpSchema } from "../schema"

interface ResendOTPButtonProps {
  email: string
}

export function ResendOTPButton(email: ResendOTPButtonProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: resendOtp,
  })

  async function handleResendCode(formData: z.infer<typeof resendOtpSchema>) {
    mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message ?? "Verification code resent successfully.")
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      onClick={() => handleResendCode(email)}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : <RefreshCwIcon />}
      Resend Code
    </Button>
  )
}
