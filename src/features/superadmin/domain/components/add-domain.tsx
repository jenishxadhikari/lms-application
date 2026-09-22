import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Building2Icon, Globe2Icon, Link2Icon, PlusIcon } from "lucide-react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
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

import { createDomain } from "../api"
import {
  createDomainSchema,
  PLATFORM_DOMAIN_SUFFIX,
  type CreateDomainInput,
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

export function AddDomain() {
  const [open, onOpenChange] = useState(false)

  const form = useForm<CreateDomainInput>({
    resolver: zodResolver(createDomainSchema),
    defaultValues: {
      domain: "",
      tenantId: "",
      type: "PLATFORM",
    },
  })

  const type = useWatch({ control: form.control, name: "type" })
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: createDomain,
  })

  function onSubmit(formData: CreateDomainInput) {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Domain created successfully.")
        queryClient.invalidateQueries({ queryKey: ["domains"] })
        form.reset()
        onOpenChange(false)
      },
      onError: (error) => toast.error(error.message),
    })
  }

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      trigger={
        <Button type="button">
          <PlusIcon />
          Add Domain
        </Button>
      }
      isPending={isPending}
      icon={Globe2Icon}
      title="Add domain"
      description="Use a Nepali Mentor address or connect your own domain."
      buttonLabel="Add Domain"
      formId="add-domain-form"
    >
      <form id="add-domain-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                      const optionId = `add-domain-type-${option.value.toLowerCase()}`
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
                const platform = type === "PLATFORM"
                const subdomain = field.value.endsWith(PLATFORM_DOMAIN_SUFFIX)
                  ? field.value.slice(0, -PLATFORM_DOMAIN_SUFFIX.length)
                  : field.value

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="add-domain">
                      {platform ? "Subdomain" : "Your domain"}
                    </FieldLabel>

                    {platform ? (
                      <InputGroup>
                        <InputGroupInput
                          id="add-domain"
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
                          aria-describedby="add-domain-help"
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
                        id="add-domain"
                        placeholder="astro-insight.com"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        aria-invalid={fieldState.invalid}
                        aria-describedby="add-domain-help"
                      />
                    )}

                    <FieldDescription id="add-domain-help">
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
                  <FieldLabel htmlFor="add-domain-tenant">
                    Organization
                  </FieldLabel>

                  <SelectOrganization
                    id="add-domain-tenant"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
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
