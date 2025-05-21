"use server"

import { auth } from "@/auth.config"
import { API_URL } from "@/config/constants";
import type { ISalesDetail } from "@/interfaces/models/sales.interface";


export async function getSaleInfo(id: number) {
    const session = await auth();

    try {
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unauthorized_Access" });
        }
        
        const response = await fetch(`${API_URL}/sales/detail/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'Autorization': `Bearer ${session.accessToken}`
            },
        });
    
        const data: ISalesDetail = await response.json();
    
        return { data };        
        
    } catch (error) {
        return {
            error: (error as Error).cause !== "Unauthorized_Access" 
                ? "Fallo la carga de la venta" 
                : (error as Error).message,
        }
    }
}