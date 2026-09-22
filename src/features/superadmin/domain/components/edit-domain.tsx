import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Building2Icon, Globe2Icon, Link2Icon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormDialog } from "@/components/dialog/form-dialog"
import { FormSection } from "@/components/form-section"
import { SelectOrganization } from "@/components/select-organization"

import { updateDomain } from "../api"
import {
  PLATFORM_DOMAIN_SUFFIX,
  updateDomainSchema,
  type UpdateDomainInput,
} from "../schema"

const domainTypes = [
  {
    value: "PLATFORM",
    title: "Use Nepali Mentor address",
    description: "Create a .nepalimentor.com address",
    icon: Globe2Icon,
  },
  {
    value: "CUSTOM",
    title: "Connect your own domain",
    description: "Use a domain you already own",
    icon: Link2Icon,
  },
] as const

interface EditDomainProps {
  data: UpdateDomainInput
  organizationName: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditDomain({
  data,
  organizationName,
  open,
  onOpenChange,
}: EditDomainProps) {
  const form = useForm<UpdateDomainInput>({
    resolver: zodResolver(updateDomainSchema),
    values: data,
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: updateDomain,
  })

  function onSubmit(formData: UpdateDomainInput) {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Domain updated successfully.")
        queryClient.invalidateQueries({ queryKey: ["domains"] })
        onOpenChange(false)
      },
      onError: (error) => toast.error(error.message),
    })
  }

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      isPending={isPending}
      icon={Globe2Icon}
      title="Edit domain"
      description="Update the address and organization for this domain."
      buttonLabel="Save Domain"
      formId="edit-domain-form"
    >
      <form id="edit-domain-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormSection
            icon={Globe2Icon}
            title="Domain details"
            description="Choose how this organization will be reached."
          >
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend variant="label">Domain type</FieldLegend>

                  <RadioGroup
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="md:grid-cols-2"
                  >
                    {domainTypes.map((option) => {
                      const optionId = `edit-domain-type-${option.value.toLowerCase()}`
                      const Icon = option.icon

                      return (
                        <FieldLabel key={option.value} htmlFor={optionId}>
                          <Field orientation="horizontal">
                            <FieldContent>
                              <FieldTitle>
                                <Icon
                                  aria-hidden="true"
                                  className="size-4"
                                  strokeWidth={2}
                                />
                                {option.title}
                              </FieldTitle>
                              <FieldDescription>
                                {option.description}
                              </FieldDescription>
                            </FieldContent>
                            <RadioGroupItem
                              id={optionId}
                              value={option.value}
                              aria-invalid={fieldState.invalid}
                            />
                          </Field>
                        </FieldLabel>
                      )
                    })}
                  </RadioGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />

            <Controller
              name="domain"
              control={form.control}
              render={({ field, fieldState }) => {
                const platform = data.type === "PLATFORM"
                const subdomain = field.value.endsWith(PLATFORM_DOMAIN_SUFFIX)
                  ? field.value.slice(0, -PLATFORM_DOMAIN_SUFFIX.length)
                  : field.value

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-domain">
                      {platform ? "Subdomain" : "Your domain"}
                    </FieldLabel>

                    {platform ? (
                      <InputGroup>
                        <InputGroupInput
                          id="edit-domain"
                          name={field.name}
                          ref={field.ref}
                          value={subdomain}
                          onChange={(event) =>
                            field.onChange(
                              event.target.value
                                ? `${event.target.value}${PLATFORM_DOMAIN_SUFFIX}`
                                : ""
                            )
                          }
                          onBlur={field.onBlur}
                          placeholder="academy"
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck={false}
                          aria-invalid={fieldState.invalid}
                          aria-describedby="edit-domain-help"
                        />
                        <InputGroupAddon
                          align="inline-end"
                          className="shrink-0 whitespace-nowrap"
                        >
                          {PLATFORM_DOMAIN_SUFFIX}
                        </InputGroupAddon>
                      </InputGroup>
                    ) : (
                      <Input
                        {...field}
                        id="edit-domain"
                        placeholder="astro-insight.com"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        aria-invalid={fieldState.invalid}
                        aria-describedby="edit-domain-help"
                      />
                    )}

                    <FieldDescription id="edit-domain-help">
                      {platform
                        ? "Enter only the name before .nepalimentor.com."
                        : "Enter the complete address you own, such as astro-insight.com. You’ll add a DNS TXT record after creating it."}
                    </FieldDescription>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
          </FormSection>

          <FormSection
            icon={Building2Icon}
            title="Organization"
            description="Choose the organization that owns this domain."
          >
            <Controller
              name="tenantId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-domain-tenant">
                    Organization
                  </FieldLabel>

                  <SelectOrganization
                    id="edit-domain-tenant"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    selectedName={organizationName}
                    open={open}
                    invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FormSection>
        </FieldGroup>
      </form>
    </FormDialog>
  )
}
