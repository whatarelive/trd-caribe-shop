import type { 
    SaleClient, 
    SaleFromAPI, 
    SaleDetailClient, 
    SaleDetailFromAPI, 
    SaleItemClient, 
    SaleItemFromAPI  
} from "@/interfaces/models/sales.interface";

// Adapter para mapear datos de una venta recibidos desde la API.
export const saleFromAPI = (sale: SaleFromAPI): SaleClient => ({
    id: sale.id,
    user: sale.user,
    total: sale.total,
    status: sale.status,
    method: sale.payment_method,
});

// Adapter para mapear datos de un producto de una venta recibidos desde la API.
export const itemSaleFromAPI = (item: SaleItemFromAPI): SaleItemClient => ({
    id: item.id,
    product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        finalPrice: item.product.final_price,
    },
    quantity: item.quantity,
    chargedPrice: item.charged_price,
    saleID: item.sale,
});

// Adapter para mapear datos de una venta y sus productos asociados recibidos desde la API.
export const saleDetailFromAPI = ({ sale_details, sale }: SaleDetailFromAPI): SaleDetailClient => ({
    ...saleFromAPI(sale),
    items: sale_details.map(itemSaleFromAPI),
});
