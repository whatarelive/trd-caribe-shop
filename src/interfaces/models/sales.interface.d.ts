import type { IProducts } from "@/interfaces/models/sales.interface";

type MethodPayment = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'STRIPE' | 'APPLE_PAY' | 'GOOGLE_PAY';

type Status = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED' 

export interface ISales {
    id: number;
    user: string;
    total: number;
    payment_method: MethodPayment;
    status: Status;
}

export interface ISalesDetail extends ISales {
    products: {
        id: number;
        name: string;
        price: number;
        discount: string;
        quantity: number;
        charged_price: string;
    }[];
}
