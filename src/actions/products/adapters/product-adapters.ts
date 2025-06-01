import { format } from "@/lib/format-date";
import type { IProduct, IProductAPI } from "@/interfaces/models/product.interface";

// Adapter para mapear los datos de un producto reibido desde la API.
export const productFromAPI = (product: any): IProduct => ({
    id: product.id,
    categorie: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    stock: Number(product.stock),
    discount: product.discount,
    created: format(product.created),
    updated: format(product.format),
    imageId: product.image_id,
    imageUrl: product.image_url,
});

// Adapter para mapear los datos de un producto que se van a enviar a la API.
export const productFormatAPI = (product: any): IProductAPI => ({
    ...(product.image && { image: product.image }),
    ...(product.name && { name: product.name }),
    ...(product.description && { description: product.description }),
    ...(product.categorie && { categorie: product.categorie }),
    ...(product.price && { price: product.price }),
    ...(product.stock && { stock: product.stock }),
});