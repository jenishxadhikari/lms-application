import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { FieldError } from "@/components/ui/field"

import { getOrganizations } from "@/features/superadmin/organization/api"
import type { Organization } from "@/features/superadmin/organization/schema"

type OrganizationOption = Pick<Organization, "id" | "name" | "slug">

interface SelectOrganizationProps {
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  name: string
  id: string
  selectedName?: string
  open: boolean
  invalid: boolean
}

export function SelectOrganization({
  value,
  onChange,
  onBlur,
  name,
  id,
  selectedName,
  open,
  invalid,
}: SelectOrganizationProps) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["organizations", 0, 100],
    queryFn: () => getOrganizations({ page: 0, size: 100 }),
    enabled: open,
  })

  const organizations: OrganizationOption[] = data?.tenants ?? []
  const selected =
    organizations.find((organization) => organization.id === value) ??
    (value && selectedName ? { id: value, name: selectedName, slug: "" } : null)

  return (
    <>
      <Combobox
        items={organizations}
        value={selected}
        onValueChange={(organization) => onChange(organization?.id ?? "")}
        itemToStringLabel={(organization) => organization.name}
        itemToStringValue={(organization) => organization.id}
        isItemEqualToValue={(organization, selectedOrganization) =>
          organization.id === selectedOrganization.id
        }
      >
        <ComboboxInput
          id={id}
          name={name}
          onBlur={onBlur}
          placeholder={
            isPending ? "Loading organizations..." : "Search organizations..."
          }
          aria-invalid={invalid}
          className="w-full"
          disabled={isPending || isError}
        />
        <ComboboxContent>
          <ComboboxEmpty>No organizations found.</ComboboxEmpty>
          <ComboboxList>
            {(organization: OrganizationOption) => (
              <ComboboxItem key={organization.id} value={organization}>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate">{organization.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {organization.slug}
                  </span>
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {isError && (
        <div className="flex items-center justify-between gap-3">
          <FieldError>Couldn’t load organizations.</FieldError>
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={() => refetch()}
          >
            Try again
          </Button>
        </div>
      )}
    </>
  )
}
