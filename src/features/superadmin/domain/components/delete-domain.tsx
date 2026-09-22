import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { DeleteDialog } from "@/components/dialog/delete-dialog"

import { deleteDomain } from "../api"

interface DeleteDomainProps {
  id: string
  domain: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteDomain({
  id,
  domain,
  open,
  onOpenChange,
}: DeleteDomainProps) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({ mutationFn: deleteDomain })

  function onSubmit() {
    mutate(id, {
      onSuccess: () => {
        toast.success("Domain deleted successfully.")
        queryClient.invalidateQueries({ queryKey: ["domains"] })
        onOpenChange(false)
      },
      onError: (error) => toast.error(error.message),
    })
  }

  return (
    <DeleteDialog
      title="Delete Domain"
      description={`This action cannot be undone. ${domain} will be permanently deleted.`}
      buttonLabel="Delete Domain"
      isPending={isPending}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
    />
  )
}
