import type { IProductAdd } from "@/interfaces/models/cart.interace";

// Adapter para mapear los datos del carrito del usuario recibidos desde la API.
export const cartFromAPI = (cart: any) => ({

});

// Adapter para mapear los datos de un producto para el carrito que se envia a la API.
export const productAddFormatAPI = (product: IProductAdd): IProductAdd => ({
    quantity: product.quantity,
});