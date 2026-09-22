import { useEffect, useRef, useState } from "react"

import { CheckIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  label: string
  value?: string | null
}

export function CopyButton({ label, value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<number | undefined>(undefined)

  useEffect(
    () => () => {
      window.clearTimeout(resetTimer.current)
    },
    []
  )

  async function copyValue() {
    if (!value) return

    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.clearTimeout(resetTimer.current)
      resetTimer.current = window.setTimeout(() => setCopied(false), 1600)
    } catch {
      toast.error(`Could not copy ${label.toLowerCase()}.`)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      disabled={!value}
      onClick={copyValue}
      aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
    >
      <span className="relative size-4" aria-hidden="true">
        <CopyIcon
          className={cn(
            "absolute inset-0 size-4 transition-[opacity,scale,filter] duration-150 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
            copied
              ? "scale-25 opacity-0 blur-xs"
              : "blur-0 scale-100 opacity-100"
          )}
        />
        <CheckIcon
          className={cn(
            "absolute inset-0 size-4 transition-[opacity,scale,filter] duration-150 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
            copied
              ? "blur-0 scale-100 opacity-100"
              : "scale-25 opacity-0 blur-xs"
          )}
        />
      </span>
    </Button>
  )
}
