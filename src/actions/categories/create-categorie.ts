'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { CategorieCreateSchema } from "@/actions/categories/validations/categorie-schema";


export async function createCategorie(formData: FormData) {    
    const fields = Object.fromEntries(formData.entries());
    const { data, success } = await CategorieCreateSchema.safeParseAsync(fields);
    
    try {
        if (!success) throw new BadRequestException();
        
        await service.post("/store/categories/create/", 
            data, 
            {
                isProtected: true,
                error: "Fallo la creación de la categoría",
            }
        );

        revalidateTag("categories-data");

        return {
            result: true,
            message: `Categoría ${data.name} creada`,
        };
        
    } catch (error) {
        console.error("Error en CreateCategorie", error);
        
        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido",
        };
    }
}