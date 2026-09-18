import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { OctagonAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { DataTableSkeleton } from "@/components/table/data-table-skeleton"

import { getPlans } from "@/features/superadmin/plan/api"
import { AddPlan } from "@/features/superadmin/plan/components/add-plan"
import { planColumns } from "@/features/superadmin/plan/table/columns"
import { DataTable } from "@/features/superadmin/plan/table/data-table"

export const Route = createFileRoute("/superadmin/plan")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  })

  return (
    <div className="space-y-6">
      <Header
        title="Plans"
        description="Manage your plans and their details here."
      >
        <AddPlan />
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
              <p className="font-medium">Couldn’t load plans</p>
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
            <DataTable columns={planColumns} data={data.plans} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
