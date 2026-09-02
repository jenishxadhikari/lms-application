import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { SubmitButton } from "@/components/submit-button"
import { TimezoneSelect } from "@/components/timezone"

import { createOrganizationSchema } from "@/features/superadmin/organization/schema"

export function AddOrganization() {
  const form = useForm<z.infer<typeof createOrganizationSchema>>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      timezone: "",
      currency: "",
      primaryColor: "#436CEB",
      secondaryColor: "#0A0A0A",
      logo: undefined,
      favicon: undefined,
    },
  })

  const pending = form.formState.isSubmitting

  async function onSubmit(data: z.infer<typeof createOrganizationSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button type="button">
            <Plus />
            Add Organization
          </Button>
        }
      />
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-sm md:max-h-[80vh] md:max-w-2xl">
        <form
          id="add-organization-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <DialogHeader className="shrink-0 border-b px-6 py-5">
            <DialogTitle className="text-2xl">Add Organization</DialogTitle>

            <DialogDescription>
              Fill in the details for the new organization.
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
            <FieldGroup className="gap-6">
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
                          <SelectItem value="NRP">NRP</SelectItem>
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
            </FieldGroup>
          </div>
          <DialogFooter className="shrink-0 border-t px-6 py-4">
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={pending}>
                  Cancel
                </Button>
              }
            />
            <SubmitButton
              label="Add Organization"
              pending={pending}
              className="md:w-fit"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
