'use server'

import { revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import { PromotionsCreateSchema } from "@/actions/promotions/validation/promotions-schema";


export async function createPromotion(formData: FormData) {
    const session = await auth();
    
    try {
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado");
        } 
        
        const fields = Object.fromEntries(formData.entries());
        const validation = await PromotionsCreateSchema.safeParseAsync(fields);

        if (!validation.success) throw new Error("Información incorrecta");

        if (validation.data.choice === "greater") validation.data.max_price = 0; 
        if (validation.data.choice === "less") validation.data.min_price = 0;

        await backend.post("/store/discounts/create/", validation.data, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        
        revalidateTag("promotions-data");
    
        return {
            result: true,
            message: `Promoción ${validation.data.name} creada`,
        };

    } catch (error) {
        console.error("Error en CreatePromotion", error);

        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;

        if (isAxiosError(error)) {
            message = error.status === 400 
                ? "Ya existe una promoción igual o parecida" 
                : "Fallo la creación de la promoción";
        };
        
        return { result: false, message };
    }
}