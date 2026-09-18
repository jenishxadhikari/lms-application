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

import { DeleteOrganization } from "../components/delete-organization"
import { EditOrganization } from "../components/edit-organization"
import { ViewDetails } from "../components/view-details"
import type { Organization } from "../schema"

export function OrganizationActions({
  organization,
}: {
  organization: Organization
}) {
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
            <span className="sr-only">
              Open actions for {organization.name}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="truncate">
                {organization.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setAction("view")}>
                <EyeIcon />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAction("edit")}>
                <PencilIcon />
                Edit organization
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setAction("delete")}
                variant="destructive"
              >
                <Trash2Icon />
                Delete Organization
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ViewDetails
        organization={organization}
        open={action === "view"}
        onOpenChange={(open) => setAction(open ? "view" : null)}
      />
      <EditOrganization
        data={{
          id: organization.id,
          name: organization.name,
          slug: organization.slug,
          description: organization.description,
          timezone: organization.timezone,
          currency: organization.currency.toUpperCase() as "NPR" | "USD",
          primaryColor: organization.primaryColor,
          secondaryColor: organization.secondaryColor,
        }}
        open={action === "edit"}
        onOpenChange={(open) => setAction(open ? "edit" : null)}
      />
      <DeleteOrganization
        id={organization.id}
        open={action === "delete"}
        onOpenChange={(open) => setAction(open ? "delete" : null)}
      />
    </>
  )
}
