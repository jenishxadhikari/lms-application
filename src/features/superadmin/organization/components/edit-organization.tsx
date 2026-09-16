import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Building2Icon, ImageIcon, PaletteIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { FormSection } from "@/components/form-section"
import { SubmitButton } from "@/components/submit-button"
import { TimezoneSelect } from "@/components/timezone"

import {
  updateOrganizationSchema,
  type UpdateOrganizationInput,
} from "@/features/superadmin/organization/schema"

import { updateOrganization } from "../api"

interface EditOrganizationProps {
  data: {
    id: string
    name: string
    slug: string
    description: string
    timezone: string
    currency: "NPR" | "USD"
    primaryColor: string
    secondaryColor: string
  }
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
    defaultValues: {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      timezone: data.timezone,
      currency: data.currency,
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      logo: undefined,
      favicon: undefined,
    },
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[calc(100vh-2rem)] flex-col gap-0 overflow-hidden p-0 shadow-xl duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:duration-0 sm:max-w-sm md:max-h-[min(82vh,48rem)] md:max-w-2xl data-closed:duration-150">
        <form
          id="add-organization-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <DialogHeader className="shrink-0 border-b px-6 py-5 pr-14">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/10">
                <Building2Icon className="size-5" />
              </div>
              <div className="space-y-1.5">
                <DialogTitle className="text-xl">Edit organization</DialogTitle>
                <DialogDescription>
                  Edit a workspace and set its regional and brand defaults.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
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
                        <FieldLabel htmlFor={field.name}>
                          Primary Color
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
                    render={({
                      field: { onChange, name, ref },
                      fieldState,
                    }) => (
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
                    render={({
                      field: { onChange, name, ref },
                      fieldState,
                    }) => (
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
          </div>
          <DialogFooter className="shrink-0 border-t bg-muted/20 px-6 py-4">
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              }
            />
            <SubmitButton
              label="Save Organization"
              pending={isPending}
              className="md:w-fit"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
