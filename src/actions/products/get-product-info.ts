'use server'

import { isAxiosError } from "axios";
import { backend } from "@/config/api";
import type { IProducts } from "@/interfaces/models/product.interface";


export async function getPromotionInfo(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) throw new Error("ID invalido");
        
        const { data } = await backend.get<IProducts>(`/store/discounts/${id}/`);

        return { result: true, data };
        
    } catch (error) {
        console.error("Error en GetProductsInfo", error);

        let message = "Error desconocido";

        if (error instanceof Error) message = error.message; 
        if (isAxiosError(error)) message = "Fallo la carga del producto";
        
        return { result: false, error: message };
    }
}