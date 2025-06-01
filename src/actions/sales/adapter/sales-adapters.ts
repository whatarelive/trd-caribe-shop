import type { ISales, ISalesProduct, ISalesDetail } from "@/interfaces/models/sales.interface";

// Adapter para mapear datos de una venta recibidos desde la API.
export const saleFromAPI = (sale: any): ISales => ({
    id: sale.id,
    user: sale.user,
    total: sale.total,
    status: sale.status,
    methodPayment: sale.payment_method,
});

// Adapter para mapear datos de un producto de una venta recibidos desde la API.
export const productSaleFromAPI = (product: any): ISalesProduct => ({
    id: product.id,
    name: product.name,
    discount: product.discount,
    price: product.price,
    quantity: product.quantity,
    chargedPrice: product.charged_price,
});

// Adapter para mapear datos de una venta y sus productos asociados recibidos desde la API.
export const saleDetailFromAPI = ({ products, ...rest }: any): ISalesDetail => ({
    ...saleFromAPI(rest),
    products: products.map(productSaleFromAPI),
});
