import { cn } from "@/lib/utils";
import type { Status } from "@/interfaces/models/sales.interface";

enum StatusForSale {
    PENDING = "Pendiente", 
    PAID = "Pagada",
    SHIPPED = "Enviada", 
    DELIVERED = "Entregada", 
    CANCELED = "Cancelada",
}

interface Props {
    status: Status; 
    className?: string;
}

export function SaleStatus({ status, className }: Props) {
    return (
        <span className={cn(
            "px-2 py-1 text-xs font-medium rounded-md text-white", 
            { 
                "bg-blue-500": status === "PAID",
                "bg-neutral-500": status === "PENDING",
                "bg-yellow-500": status === "SHIPPED",
                "bg-green-500" : status === "DELIVERED", 
                "bg-red-500" : status === "CANCELED" 
            }, className
        )}>
            {StatusForSale[status]}
        </span>
    )
}
