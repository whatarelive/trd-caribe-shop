import type { ResourceSummaryClient, ResourceSummaryFromAPI, SaleMonth } from "@/interfaces/models/analytics.interface";

export const resourceFromApi = (resp: ResourceSummaryFromAPI): ResourceSummaryClient => ({
    products: resp.products_count,
    promotions: resp.promotions_count,
    comments: resp.comments_count,
    users: resp.users_count,
    sales: resp.sales_count,
});

export const saleMonthFromApi = (resp: SaleMonth): SaleMonth => ({
    month: resp.month,
    total: resp.total,
})