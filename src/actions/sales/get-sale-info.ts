'use server'

import { auth } from "@/auth.config"
import { backend } from "@/config/api";
import type { ISalesDetail } from "@/interfaces/models/sales.interface";


export async function getSaleInfo(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) throw new Error("ID invalido");    
        
        const session = await auth();
        
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado");
        }
        
        const { data } = await backend.get<ISalesDetail>(`/sales/detail/${id}`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });    
    
        return { result: true, data };        
        
    } catch (error) {
        console.error("Error en GetSalesInfo", error);

        return {
            result: false,
            error: (error instanceof Error) ? error.message : "Fallo la carga de la venta",
        }
    }
}