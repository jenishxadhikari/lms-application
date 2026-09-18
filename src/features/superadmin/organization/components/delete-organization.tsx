import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { DeleteDialog } from "@/components/dialog/delete-dialog"

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
        onOpenChange(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <DeleteDialog
      title="Delete Organization"
      description="This action cannot be undone. This will permanently delete the organization and remove your data from our servers."
      buttonLabel="Delete Organization"
      isPending={isPending}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
    />
  )
}
