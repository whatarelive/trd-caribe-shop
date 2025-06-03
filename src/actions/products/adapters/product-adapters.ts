import { format } from "@/lib/format-date";
import type { IProduct, IProductAPI } from "@/interfaces/models/product.interface";

// Adapter para mapear los datos de un producto reibido desde la API.
export const productFromAPI = (product: any): IProduct => ({
    id: product.id,
    categorie: product.categorie,
    name: product.name,
    description: product.description,
    price: product.price,
    finalPrice: product.final_price,
    stock: Number(product.stock),
    discount: product.discount !== null ? true : false,
    created: format(product.created),
    updated: format(product.updated),
    imageId: product.image_id,
    imageUrl: product.image_url,
});

// Adapter para mapear los datos de un producto que se van a enviar a la API.
export const productFormatAPI = (data: any): FormData => {
    const payload = new FormData();

    if (data.name) payload.append("name", data.name);
    if (data.description) payload.append("description", data.description);
    if (data.categorie) payload.append("categorie", data.categorie.toString());
    if (data.price) payload.append("price", data.price.toString());
    if (data.stock) payload.append("stock", data.stock.toString());
    if (data.image) payload.append("image", data.image);

    return payload;
}