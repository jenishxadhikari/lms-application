import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function OrganizationDataTableSkeleton() {
  return (
    <div className="min-w-0">
      <div className="flex flex-col gap-3 border-b px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <Skeleton className="h-9 w-full sm:max-w-sm" />
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="space-y-1 border-b bg-muted/15 px-4 py-3 sm:px-5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="min-w-0">
        <Table>
          <TableHeader className="bg-muted/25">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-11 px-4">
                <Skeleton className="h-4 w-24" />
              </TableHead>

              <TableHead className="h-11 px-4">
                <Skeleton className="h-4 w-12" />
              </TableHead>

              <TableHead className="h-11 px-4">
                <Skeleton className="h-4 w-14" />
              </TableHead>

              <TableHead className="h-11 px-4">
                <Skeleton className="h-4 w-20" />
              </TableHead>

              <TableHead className="h-11 px-4">
                <Skeleton className="h-4 w-16" />
              </TableHead>

              <TableHead className="h-11 w-14 px-4">
                <Skeleton className="h-4 w-6" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                <TableCell className="px-4 py-3">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-5 w-24 rounded-full" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-12" />
                </TableCell>
                <TableCell className="w-14 px-4 py-3">
                  <Skeleton className="size-8 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between border-t px-4 py-4">
        <Skeleton className="h-4 w-32" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    </div>
  )
}
