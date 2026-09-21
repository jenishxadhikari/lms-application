import { format } from "date-fns"

export const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
})

export function formatDate(date: Date | string) {
  return format(new Date(date), "MMM dd, yyyy")
}
