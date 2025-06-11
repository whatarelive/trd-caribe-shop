export interface ResourceSummaryFromAPI {
    products_count: number;
    promotions_count: number;
    comments_count: number;
    users_count: number;
    sales_count: number;
}

export interface ResourceSummaryClient {
    products: number;
    promotions: number;
    comments: number;
    users: number;
    sales: number;
}

export interface SaleMonth {
    month: string;
    total: number;
}