import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  CreditCardIcon,
  PackageIcon,
  PlusIcon,
  UsersRoundIcon,
} from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ActionDialog } from "@/components/dialog/action-dialog"
import { FormSection } from "@/components/form-section"
import { SubmitButton } from "@/components/submit-button"

import { createPlan } from "../api"
import { createPlanSchema, type CreatePlanInput } from "../schema"

export function AddPlan() {
  const [open, onOpenChange] = useState(false)
  const form = useForm<CreatePlanInput>({
    resolver: zodResolver(createPlanSchema),
    defaultValues: {
      name: "",
      code: "",
      maxStudents: undefined,
      maxMentors: undefined,
      maxCourses: undefined,
      storageGB: undefined,
      priceMonthly: undefined,
      priceYearly: undefined,
    },
  })

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: createPlan,
  })

  function onSubmit(formData: CreatePlanInput) {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Plan created successfully.")
        queryClient.invalidateQueries({ queryKey: ["plans"] })
        form.reset()
        onOpenChange(false)
      },
      onError: (error) => toast.error(error.message),
    })
  }

  return (
    <ActionDialog
      open={open}
      onOpenChange={onOpenChange}
      trigger={
        <Button type="button">
          <PlusIcon />
          Add Plan
        </Button>
      }
      title="Add plan"
      description="Set the plan details, limits, and pricing."
      icon={PackageIcon}
      isPending={isPending}
      primaryAction={
        <SubmitButton
          label="Create plan"
          pending={isPending}
          className="sm:w-fit"
          form="add-plan-form"
        />
      }
    >
      <form id="add-plan-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-8">
          <FormSection
            icon={PackageIcon}
            title="Plan details"
            description="The name and code used to identify this plan."
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Basic Plan"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Code</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="BASIC"
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

          <FormSection
            icon={UsersRoundIcon}
            title="Usage limits"
            description="Set the capacity included with this plan."
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Controller
                name="maxStudents"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Max Students</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="100"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value, 10))
                      }
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="maxMentors"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Max Mentors</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="10"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value, 10))
                      }
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="maxCourses"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Max Courses</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="20"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value, 10))
                      }
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="storageGB"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Storage (GB)</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="20"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value, 10))
                      }
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FormSection>

          <FormSection
            icon={CreditCardIcon}
            title="Pricing"
            description="Set monthly and yearly prices in USD."
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Controller
                name="priceMonthly"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Monthly price ($)
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="20.00"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="priceYearly"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Yearly price ($)
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="170.00"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
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
    </ActionDialog>
  )
}
