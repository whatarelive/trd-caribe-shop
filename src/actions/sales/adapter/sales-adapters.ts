import type { ISales, ISalesProduct, ISalesDetail } from "@/interfaces/models/sales.interface";

// Adapter para mapear datos de una venta recibidos desde la API.
export const saleFromAPI = (sale: ISales): ISales => ({
    id: sale.id,
    user: sale.user,
    total: sale.total,
    status: sale.status,
    methodPayment: sale.methodPayment,
});

// Adapter para mapear datos de un producto de una venta recibidos desde la API.
export const productSaleFromAPI = (product: ISalesProduct): ISalesProduct => ({
    id: product.id,
    name: product.name,
    discount: product.discount,
    price: product.price,
    quantity: product.quantity,
    chargedPrice: product.chargedPrice,
});

// Adapter para mapear datos de una venta y sus productos asociados recibidos desde la API.
export const saleDetailFromAPI = ({ products, ...rest }: ISalesDetail): ISalesDetail => ({
    ...saleFromAPI(rest),
    products: products.map(productSaleFromAPI),
});
