import { useMutation } from "@tanstack/react-query"
import { Trash2Icon } from "lucide-react"
import { toast } from "sonner"

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

import { deleteOrganization } from "../api"

interface DeleteOrganizationProps {
  id: string
}

export function DeleteOrganization({ id }: DeleteOrganizationProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteOrganization,
  })

  async function onDelete() {
    mutate(id, {
      onSuccess: (data) => {
        toast.success(data.message ?? "Organization deleted successfully")
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
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
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            }
          />
          <Button variant="destructive" onClick={onDelete} disabled={isPending}>
            {isPending && <Spinner />} Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
