import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { ShieldUserIcon, UserPlus2Icon, UserPlusIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ActionDialog } from "@/components/dialog/action-dialog"
import { FormSection } from "@/components/form-section"
import { SubmitButton } from "@/components/submit-button"

import {
  inviteUserSchema,
  type InviteUserInput,
} from "@/features/superadmin/organization/schema"

import { inviteUser } from "../api"

const roleTypes = [
  {
    value: "OWNER",
    title: "Owner",
    icon: ShieldUserIcon,
  },
] as const

interface InviteUserProps {
  id: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InviteUser({ id, open, onOpenChange }: InviteUserProps) {
  const form = useForm<InviteUserInput>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      role: "OWNER",
      tenantId: id,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: inviteUser,
  })

  async function onSubmit(formData: InviteUserInput) {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Successfully invited user to the organization.")
        onOpenChange(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <ActionDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Invite User"
      description="Invite a new user to the organization."
      icon={UserPlusIcon}
      isPending={isPending}
      primaryAction={
        <SubmitButton
          label="Invite user"
          pending={isPending}
          className="sm:w-fit"
          form="invite-user-form"
        />
      }
    >
      <form id="invite-user-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-8">
          <FormSection
            icon={UserPlus2Icon}
            title="Invite details"
            description="Enter the details of the user you want to invite."
          >
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="m@example.com"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend variant="label">Role</FieldLegend>

                  <RadioGroup
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="md:grid-cols-2"
                  >
                    {roleTypes.map((option) => {
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
          </FormSection>
        </FieldGroup>
      </form>
    </ActionDialog>
  )
}
