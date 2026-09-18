import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Building2Icon, ImageIcon, PaletteIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FormDialog } from "@/components/dialog/form-dialog"
import { FormSection } from "@/components/form-section"
import { TimezoneSelect } from "@/components/timezone"

import {
  updateOrganizationSchema,
  type UpdateOrganizationInput,
} from "@/features/superadmin/organization/schema"

import { updateOrganization } from "../api"

interface EditOrganizationProps {
  data: UpdateOrganizationInput
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditOrganization({
  data,
  open,
  onOpenChange,
}: EditOrganizationProps) {
  const form = useForm<UpdateOrganizationInput>({
    resolver: zodResolver(updateOrganizationSchema),
    values: data,
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: updateOrganization,
  })

  async function onSubmit(formData: UpdateOrganizationInput) {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Successfully updated organization.")
        queryClient.invalidateQueries({ queryKey: ["organizations"] })
        onOpenChange(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit organization"
      description="Edit a workspace and set its regional and brand defaults."
      icon={Building2Icon}
      isPending={isPending}
      buttonLabel="Update organization"
      formId="edit-organization-form"
    >
      <form id="edit-organization-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-8">
          <FormSection
            icon={Building2Icon}
            title="Organization details"
            description="Basic details used across the workspace."
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Acme Corp"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="slug"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Slug</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="acme-corp"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>

                  <Textarea
                    {...field}
                    id={field.name}
                    placeholder="Organization description"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FormSection>

          <FormSection
            icon={PaletteIcon}
            title="Regional & brand settings"
            description="Defaults for time, billing, and visual identity."
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Controller
                name="timezone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Timezone</FieldLabel>

                    <TimezoneSelect
                      {...field}
                      placeholder="Select timezone"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="currency"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Currency</FieldLabel>

                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className="w-full"
                      >
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="NPR">NPR</SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Controller
                name="primaryColor"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Primary Color</FieldLabel>

                    <div className="flex items-center gap-2">
                      <Input
                        id={field.name}
                        type="color"
                        value={field.value || "#000000"}
                        onChange={(e) => field.onChange(e.target.value)}
                        aria-invalid={fieldState.invalid}
                        className="size-9 shrink-0 cursor-pointer p-1"
                      />

                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="#000000"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="secondaryColor"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Secondary Color
                    </FieldLabel>

                    <div className="flex items-center gap-2">
                      <Input
                        id={field.name}
                        type="color"
                        value={field.value || "#000000"}
                        onChange={(e) => field.onChange(e.target.value)}
                        aria-invalid={fieldState.invalid}
                        className="size-9 shrink-0 cursor-pointer p-1"
                      />

                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="#000000"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FormSection>

          <FormSection
            icon={ImageIcon}
            title="Brand assets"
            description="Optional images shown in navigation and browser tabs."
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Controller
                name="logo"
                control={form.control}
                render={({ field: { onChange, name, ref }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>Logo</FieldLabel>

                    <Input
                      id={name}
                      name={name}
                      ref={ref}
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files?.[0])}
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="favicon"
                control={form.control}
                render={({ field: { onChange, name, ref }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>Favicon</FieldLabel>

                    <Input
                      id={name}
                      name={name}
                      ref={ref}
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files?.[0])}
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FormSection>
        </FieldGroup>
      </form>
    </FormDialog>
  )
}
