export type MethodPayment = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'STRIPE' | 'APPLE_PAY' | 'GOOGLE_PAY';
export type Status = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';

interface SaleBasic {
    id: number;
    user: string;
    total: number;
    status: Status;
}

export interface SaleItemFromAPI {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        final_price: number;
    };
    charged_price: number;
    sale: number;
}

export interface SaleItemClient {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        finalPrice: number;
    };
    chargedPrice: number;
    saleID: number;
}

export interface SaleFromAPI extends SaleBasic {
    payment_method: MethodPayment;
}

export interface SaleClient extends SaleBasic {
    method: MethodPayment;
}

export interface SaleDetailFromAPI {
    sale: SalesFromAPI;
    sale_details: SaleItemFromAPI[];
}

export interface SaleDetailClient extends SaleClient {
    items: SaleItemClient[];
}

export interface SalesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: SalesFromAPI[];
}

export interface SaleChartData {
    name: string;
    total: number;
    sales: number;
}