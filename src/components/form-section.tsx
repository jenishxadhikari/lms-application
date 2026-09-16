import type { Building2Icon } from "lucide-react"

export function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof Building2Icon
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-5">
      <div className="flex items-start gap-2.5">
        <Icon className="mt-0.5 size-4 text-muted-foreground" />
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-6 pl-6.5">{children}</div>
    </section>
  )
}
