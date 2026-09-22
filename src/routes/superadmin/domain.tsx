import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { OctagonAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { DataTableSkeleton } from "@/components/table/data-table-skeleton"

import { getDomains } from "@/features/superadmin/domain/api"
import { AddDomain } from "@/features/superadmin/domain/components/add-domain"
import { domainColumns } from "@/features/superadmin/domain/table/columns"
import { DataTable } from "@/features/superadmin/domain/table/data-table"

export const Route = createFileRoute("/superadmin/domain")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["domains"],
    queryFn: getDomains,
  })

  return (
    <div className="space-y-6">
      <Header
        title="Domains"
        description="Manage organization domains and verification."
      >
        <AddDomain />
      </Header>

      <Card className="gap-0 overflow-hidden py-0 shadow-sm">
        <CardContent className="gap-0 px-0">
          {isPending ? (
            <DataTableSkeleton />
          ) : isError ? (
            <div className="flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center">
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive ring-1 ring-destructive/10">
                <OctagonAlert className="size-5" />
              </div>
              <p className="font-medium">Couldn’t load domains</p>
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
            <DataTable columns={domainColumns} data={data.domains} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
