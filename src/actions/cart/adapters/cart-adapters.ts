import type { IProductAdd, CartFromAPI, CartClient, CartItemFromAPI, CartItemClient } from "@/interfaces/models/cart.interace";

// Adapter para mapear los datos de los productos del carrito del usuario recibidos desde la API.
const itemFromAPI = (item: CartItemFromAPI): CartItemClient => ({
    id: item.id,
    quantity: Number(item.quantity),
    product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        finalPrice: item.product.final_price,
    },
    subtotal: Number(item.subtotal),
});

// Adapter para mapear los datos del carrito del usuario recibidos desde la API.
export const cartFromAPI = (cart: CartFromAPI): CartClient => ({
    id: cart.id,
    user: cart.user,
    items: cart.car_items.map(itemFromAPI),
    total: Number(cart.total),
});

// Adapter para mapear los datos de un producto para el carrito que se envia a la API.
export const productAddFormatAPI = (product: IProductAdd): IProductAdd => ({
    quantity: product.quantity,
});