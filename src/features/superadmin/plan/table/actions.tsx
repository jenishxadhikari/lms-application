import { useState } from "react"

import {
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DeletePlan } from "../components/delete-plan"
import { EditPlan } from "../components/edit-plan"
import { ViewDetails } from "../components/view-details"
import type { Plan } from "../schema"

export function PlanActions({ plan }: { plan: Plan }) {
  const [action, setAction] = useState<"view" | "edit" | "delete" | null>(null)

  return (
    <>
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground transition-[color,background-color,scale] duration-150 active:scale-96 data-popup-open:bg-muted motion-reduce:transition-none"
              />
            }
          >
            <MoreHorizontalIcon />
            <span className="sr-only">Open actions for {plan.name}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="truncate">
                {plan.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setAction("view")}>
                <EyeIcon />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAction("edit")}>
                <PencilIcon />
                Edit plan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setAction("delete")}
                variant="destructive"
              >
                <Trash2Icon />
                Delete plan
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ViewDetails
        plan={plan}
        open={action === "view"}
        onOpenChange={(open) => setAction(open ? "view" : null)}
      />
      <EditPlan
        data={{
          id: plan.id,
          name: plan.name,
          code: plan.code,
          maxStudents: plan.maxStudents,
          maxMentors: plan.maxMentors,
          maxCourses: plan.maxCourses,
          storageGB: plan.storageGB,
          priceMonthly: plan.priceMonthly,
          priceYearly: plan.priceYearly,
        }}
        open={action === "edit"}
        onOpenChange={(open) => setAction(open ? "edit" : null)}
      />
      <DeletePlan
        id={plan.id}
        open={action === "delete"}
        onOpenChange={(open) => setAction(open ? "delete" : null)}
      />
    </>
  )
}
