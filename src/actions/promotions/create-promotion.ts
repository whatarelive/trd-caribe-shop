'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { promotionApiFormat } from "@/actions/promotions/adapters/promotions-adapter";
import { PromotionsCreateSchema } from "@/actions/promotions/validation/promotions-schema";


export async function createPromotion(formData: FormData) {
    const fields = Object.fromEntries(formData.entries());
    const { data, success } = await PromotionsCreateSchema.safeParseAsync(fields);
    
    try {
        if (!success) throw new BadRequestException();

        await service.post("/store/discounts/create/", 
            promotionApiFormat(data), 
            { 
                isProtected: true, 
                error: "Fallo la creación de la promoción",
            },
        );
        
        revalidateTag("promotions-data");
        revalidateTag("products-data");
    
        return {
            result: true,
            message: `Promoción ${data.name} creada`,
        };

    } catch (error) {
        console.error("Error en CreatePromotion", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}