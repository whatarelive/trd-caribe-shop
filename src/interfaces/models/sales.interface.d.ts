export type MethodPayment = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'STRIPE' | 'APPLE_PAY' | 'GOOGLE_PAY';
export type Status = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';

export interface ISalesProduct {
    id: number;
    name: string;
    price: number;
    discount: number;
    quantity: number;
    chargedPrice: number;
}

export interface ISales {
    id: number;
    user: string;
    total: number;
    methodPayment: MethodPayment;
    status: Status;
}

export interface ISalesDetail extends ISales {
    products: ISalesProduct[];
}

export interface SalesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
}