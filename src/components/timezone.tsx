import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const timezones = (() => {
  const values = Intl.supportedValuesOf("timeZone")

  return values.includes("UTC") ? values : ["UTC", ...values]
})()

type TimezoneSelectProps = {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  name?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  "aria-invalid"?: boolean
}

export const TimezoneSelect = React.forwardRef<
  HTMLInputElement,
  TimezoneSelectProps
>(
  (
    {
      value = "",
      onChange,
      onBlur,
      name,
      placeholder = "Select timezone...",
      disabled,
      className,
      "aria-invalid": ariaInvalid,
    },
    ref
  ) => {
    return (
      <Combobox
        items={timezones}
        value={value}
        onValueChange={(value) => {
          if (typeof value === "string") {
            onChange?.(value)
          }
        }}
        disabled={disabled}
      >
        <ComboboxInput
          ref={ref}
          name={name}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
          className={className}
          showClear
        />

        <ComboboxContent>
          <ComboboxEmpty>No timezone found.</ComboboxEmpty>

          <ComboboxList>
            {(timezone) => (
              <ComboboxItem key={timezone} value={timezone}>
                {timezone}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  }
)

TimezoneSelect.displayName = "TimezoneSelect"
