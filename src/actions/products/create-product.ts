'use server'

import { revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import { CreateProductSchema } from "@/actions/products/validations/products-schema";


export async function createProduct(formData: FormData) {
    const session = await auth();
    
    try {
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no autorizado");
        }

        const fields = Object.fromEntries(formData.entries());       
        const validation = await CreateProductSchema.safeParseAsync(fields);
        
        if (!validation.success) throw new Error("Información incorrecta");
 
        await backend.post("/store/products/", validation.data, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        revalidateTag("products-data");

        return {
            result: true,
            message: "Producto creado exitosamente"
        };
        
    } catch (error) {
        console.error("Error en CreateProduct", error);

        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la creación del producto";  

        return { result: false, message };
    }    
}