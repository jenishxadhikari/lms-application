import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { DeleteDialog } from "@/components/dialog/delete-dialog"

import { deletePlan } from "../api"

interface DeletePlanProps {
  id: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeletePlan({ id, open, onOpenChange }: DeletePlanProps) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: deletePlan,
  })

  async function onSubmit() {
    mutate(id, {
      onSuccess: () => {
        toast.success("Plan deleted successfully.")
        queryClient.invalidateQueries({ queryKey: ["plans"] })
        onOpenChange(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <DeleteDialog
      title="Delete Plan"
      description="This action cannot be undone. The plan will be permanently deleted."
      buttonLabel="Delete Plan"
      isPending={isPending}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
    />
  )
}
