'use server'

import { revalidatePath, revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import { CategorieCreateSchema } from "@/actions/categories/validations/categorie-schema";


export async function createCategorie(formData: FormData) {    
    const session = await auth();
    
    try {
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado");
        }

        const fields = Object.fromEntries(formData.entries());
        const validation = await CategorieCreateSchema.safeParseAsync(fields);

        if (!validation.success) throw new Error("Información Incorrecta");
        
        await backend.post("/store/categories/create/", validation.data, {
            headers: { Authorization: `Bearer ${session.accessToken}` }
        });

        revalidateTag("categories-data");
        revalidatePath("/admin/products/");

        return {
            result: true,
            message: `Categoría ${validation.data.name} creada`,
        }
        
    } catch (error) {
        console.error("Error en CreateCategorie", error);
        
        let message = "Error desconocido"; 
        
        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la creación de la categoría";

        return { result: false, message };
    }
}