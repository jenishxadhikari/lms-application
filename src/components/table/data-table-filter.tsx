import type { Column, RowData } from "@tanstack/react-table"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { DataTableFeatures } from "@/components/table/data-table-features"

const ALL_OPTIONS = "__all__"

type FilterOption = {
  label: string
  value: string | boolean
}

export function DataTableFilter<TData extends RowData>({
  label,
  allLabel,
  column,
  options,
}: {
  label: string
  allLabel: string
  column?: Column<DataTableFeatures, TData>
  options: readonly FilterOption[]
}) {
  const filterValue = column?.getFilterValue()
  const selectedOption = options.find((option) => option.value === filterValue)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-9 w-full min-w-0 justify-between gap-2 bg-background sm:w-auto sm:min-w-36",
              selectedOption && "border-primary/30 bg-primary/5"
            )}
          />
        }
      >
        <span className="text-muted-foreground">{label}</span>
        <span className="truncate font-medium">
          {selectedOption?.label ?? "All"}
        </span>
        <ChevronDownIcon className="ml-auto size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Filter by {label.toLowerCase()}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={selectedOption ? String(selectedOption.value) : ALL_OPTIONS}
            onValueChange={(value) =>
              column?.setFilterValue(
                value === ALL_OPTIONS
                  ? undefined
                  : options.find((option) => String(option.value) === value)
                      ?.value
              )
            }
          >
            <DropdownMenuRadioItem value={ALL_OPTIONS} closeOnClick>
              {allLabel}
            </DropdownMenuRadioItem>
            {options.map((option) => (
              <DropdownMenuRadioItem
                key={String(option.value)}
                value={String(option.value)}
                closeOnClick
              >
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
