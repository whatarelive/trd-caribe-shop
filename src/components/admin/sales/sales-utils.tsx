import { cn } from "@/lib/utils";
import { MdOutlineAddCard } from "react-icons/md";

import type { FC } from "react";
import type { Status, MethodPayment } from "@/interfaces/models/sales.interface";

interface DataSectionProps {
    label: string; 
    value: number | string;
    className?: string;
}

const StatusForSale = {
    PENDING: "Pendiente", 
    PAID: "Pagada",
    SHIPPED: "Enviada", 
    DELIVERED: "Entregada", 
    CANCELED: "Cancelada",
}

const SaleMethodPayment = {
    CREDIT_CARD: "Tarjeta Credito",
    DEBIT_CARD: "Tarjeta Debito", 
    PAYPAL: "Paypal",
    STRIPE: "Stripe",
    APPLE_PAY: "Apple Pay",
    GOOGLE_PAY: "Google Pay",
}

export const SaleStatus: FC<{ status: Status, className?: string }> = ({ status, className }) => (
    <span className={cn(
        "p-1 text-sm rounded-md border", 
        { 
            "bg-blue-100 text-blue-500 border-blue-500": status === "PAID",
            "bg-neutral-100 text-neutral-500 border-neutral-500": status === "PENDING",
            "bg-yellow-100 text-yellow-500 border-y-amber-500": status === "SHIPPED",
            "bg-green-100 text-green-500 border-green-500" : status === "DELIVERED", 
            "bg-red-100 text-red-500 border-e-red-500" : status === "CANCELED" 
        }, className
    )}>
        {StatusForSale[status]}
    </span>
)

export const SaleMethod: FC<{ method: MethodPayment }> = ({ method }) => (
    <div className="inline-flex gap-1.5 items-center">
        <MdOutlineAddCard size={20}/>
        <span>
            {SaleMethodPayment[method]}
        </span>
    </div>
)

export const DataSection: FC<DataSectionProps> = ({ label, value, className }) => {
    return (
        <div className={cn("flex justify-between gap-2", className)}>
            <h4>{ label }</h4>
            <b>{ value }</b>
        </div>
    )
} 
