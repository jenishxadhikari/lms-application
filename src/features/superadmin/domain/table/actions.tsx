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

import { DeleteDomain } from "../components/delete-domain"
import { EditDomain } from "../components/edit-domain"
import { VerifyDomain } from "../components/verify-domain"
import type { Domain } from "../schema"

export function DomainActions({ domain }: { domain: Domain }) {
  const [action, setAction] = useState<"verify" | "edit" | "delete" | null>(
    null
  )

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
            <span className="sr-only">Open actions for {domain.domain}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="truncate">
                {domain.domain}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {domain.status === "PENDING_VERIFICATION" && (
                <DropdownMenuItem onClick={() => setAction("verify")}>
                  <EyeIcon />
                  Verify domain
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => setAction("edit")}>
                <PencilIcon />
                Edit domain
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setAction("delete")}
                variant="destructive"
              >
                <Trash2Icon />
                Delete domain
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {domain.status === "PENDING_VERIFICATION" && (
        <VerifyDomain
          domain={domain}
          open={action === "verify"}
          onOpenChange={(open) => setAction(open ? "verify" : null)}
        />
      )}
      <EditDomain
        data={{
          id: domain.id,
          domain: domain.domain,
          tenantId: domain.tenantId,
          type: domain.type,
        }}
        organizationName={domain.name}
        open={action === "edit"}
        onOpenChange={(open) => setAction(open ? "edit" : null)}
      />
      <DeleteDomain
        id={domain.id}
        domain={domain.domain}
        open={action === "delete"}
        onOpenChange={(open) => setAction(open ? "delete" : null)}
      />
    </>
  )
}
