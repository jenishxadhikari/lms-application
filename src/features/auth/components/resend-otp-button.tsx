import { useMutation } from "@tanstack/react-query"
import { RefreshCwIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { resendOtp } from "../api"
import type { ResendOtpData } from "../schema"

export function ResendOTPButton({ email, otpType }: ResendOtpData) {
  const { mutate, isPending } = useMutation({
    mutationFn: resendOtp,
  })

  async function handleResendCode(formData: ResendOtpData) {
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
      onClick={() => handleResendCode({ email, otpType })}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : <RefreshCwIcon />}
      Resend Code
    </Button>
  )
}
