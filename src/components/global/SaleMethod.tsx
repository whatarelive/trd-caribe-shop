import { CreditCard } from "lucide-react";
import type { MethodPayment } from "@/interfaces/models/sales.interface";

enum SaleMethodPayment {
    CREDIT_CARD = "Tarjeta Credito",
    DEBIT_CARD = "Tarjeta Debito", 
    PAYPAL = "Paypal",
    STRIPE = "Stripe",
    APPLE_PAY = "Apple Pay",
    GOOGLE_PAY = "Google Pay",
}

export function SaleMethod({ method }:{ method: MethodPayment }) {
    return (
        <div className="inline-flex gap-1.5 items-center">
            <CreditCard size={20}/>
            
            <span className="font-medium">
                {SaleMethodPayment[method]}
            </span>
        </div>

    )
}