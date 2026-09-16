import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { OctagonAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { DataTable } from "@/components/table/data-table"
import { OrganizationDataTableSkeleton } from "@/components/table/data-table-skeleton"

import { getOrganizations } from "@/features/superadmin/organization/api"
import { AddOrganization } from "@/features/superadmin/organization/components/add-organization"
import { organizationColumns } from "@/features/superadmin/organization/table/columns"

export const Route = createFileRoute("/superadmin/organization")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  })

  return (
    <div className="space-y-6">
      <Header
        title="Organizations"
        description="Manage organizations, access, and workspace settings."
      >
        <AddOrganization />
      </Header>

      <Card className="gap-0 overflow-hidden py-0 shadow-sm">
        <CardContent className="gap-0 px-0">
          {isPending ? (
            <OrganizationDataTableSkeleton />
          ) : isError ? (
            <div className="flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center">
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive ring-1 ring-destructive/10">
                <OctagonAlert className="size-5" />
              </div>
              <p className="font-medium">Couldn’t load organizations</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {error.message}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => refetch()}
              >
                Try again
              </Button>
            </div>
          ) : (
            <DataTable columns={organizationColumns} data={data.tenants} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
