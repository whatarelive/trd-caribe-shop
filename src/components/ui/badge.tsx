import type { FC, ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";


// Estilos del componente
const badgeVariants = cva(
    `inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none 
    focus:ring-2 focus:ring-ring focus:ring-offset-2`,
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
                category: "bg-orange-400 text-white",
                secondary: "bg-neutral-100 text-neutral-500",
                acept: "bg-blue-100 text-blue-500",
                success: "bg-green-100 text-green-500",
                destructive: "bg-red-100 text-red-500",
                info: "bg-yellow-100 text-yellow-500",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

// Props del componente
interface BadgeProps 
    extends ComponentProps<"div">, 
    VariantProps<typeof badgeVariants> {}

// Componente principal
export const Badge: FC<BadgeProps> = ({ className, variant, ...props }) => {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
