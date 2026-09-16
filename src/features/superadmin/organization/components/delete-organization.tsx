import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/ui/spinner"

import { deleteOrganization } from "../api"

interface DeleteOrganizationProps {
  id: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteOrganization({
  id,
  open,
  onOpenChange,
}: DeleteOrganizationProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteOrganization,
  })

  async function onSubmit() {
    mutate(id, {
      onSuccess: () => {
        toast.success("Organization deleted successfully.")
        queryClient.invalidateQueries({ queryKey: ["organizations"] })
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Organization</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            organization and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending && <Spinner />} Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
