import type { ProductClient, ProductFromAPI } from "@/interfaces/models/product.interface";

export interface IProductAdd {
    quantity: number;
}

export interface CartItemClient {
    id: number;
    quantity: number;
    product: Pick<ProductClient, "id" | "name" | "price" | "finalPrice">;
    subtotal: number;
}

export interface CartItemFromAPI {
    id: number;
    quantity: string;
    product: Pick<ProductFromAPI, "id" | "name" | "price" | "final_price">;
    subtotal: string;
}

export interface CartClient {
    id: number;
    user: number;
    items: CartItemClient[];
    total: number;
}

export interface CartFromAPI {
    id: number;
    user: number;
    car_items: CartItemFromAPI[];
    total: string;
}