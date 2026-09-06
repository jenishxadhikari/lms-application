import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"

import { getOrganizations } from "@/features/superadmin/organization/api"
import { AddOrganization } from "@/features/superadmin/organization/components/add-organization"
import { organizationColumns } from "@/features/superadmin/organization/table/columns"
import { OrganizationDataTable } from "@/features/superadmin/organization/table/data-table"

export const Route = createFileRoute("/superadmin/organization")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isPending } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  })

  if (isPending) {
    return <div>Loading organizations...</div>
  }

  return (
    <div className="space-y-6">
      <Header
        title="Organizations"
        description="Manage organizations, access, and workspace settings."
      >
        <AddOrganization />
      </Header>

      <Card className="gap-0 py-0">
        <CardContent className="gap-0 px-0">
          <OrganizationDataTable
            columns={organizationColumns}
            data={data.tenants}
          />
        </CardContent>
      </Card>
    </div>
  )
}
