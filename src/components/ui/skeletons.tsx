import { cn } from "@/utils/tailwind-cn";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <span
      className={cn("animate-pulse rounded-md bg-neutral-200", className)}
      {...props}
    />
  )
}