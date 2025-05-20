"use server"

import { revalidateTag } from "next/cache";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import { PromotionsCreateSchema } from "@/actions/promotions/validation/promotions-schema";


export async function CreatePromotion(formData: FormData) {
    const fields = Object.fromEntries(formData.entries());
    
    const { data, success } = await PromotionsCreateSchema.safeParseAsync(fields);

    if (!success) {
        return {
            result: false,
            message: "Información incorrecta",
        };
    }

    const session = await auth();

    try {
        if (!session || !session.user || !session.user.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unauthorized_Access" });
        }

        await backend.post("/store/discounts/create/", { ...data }, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        });
        
    } catch (error) {
        const message = (error as Error).cause !== "Unauthorized_Access"  
            ? "Fallo la creación de la promoción"
            : (error as Error).message;  
        
        return { result: false, message };
    }

    revalidateTag("promotions-data");

    return {
        result: true,
        message: `Promoción ${data.name} creada`,
    }
}