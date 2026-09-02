import { useState } from "react"

import { Trash2Icon } from "lucide-react"

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
import { Spinner } from "@/components/ui/spinner"

export function DeleteOrganization() {
  const [pending, setPending] = useState(false)

  async function onSubmit() {
    setPending(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setPending(false)
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start px-1.5 font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2Icon />
            Delete Organization
          </Button>
        }
      />
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-sm md:max-h-[80vh] md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Delete Organization</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this organization? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" disabled={pending}>
                Cancel
              </Button>
            }
          />
          <Button variant="destructive" onClick={onSubmit} disabled={pending}>
            {pending && <Spinner />} Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
