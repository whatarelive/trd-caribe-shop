'use server'

import { revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import { UpdateProductSchema } from "@/actions/products/validations/products-schema";


export async function updateProduct(id: number, formData: FormData) {
    try {
        if (typeof id !== "number" || id <= 0) throw new Error("ID invalido");

        const session = await auth();
        
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no autorizado");
        }

        const fields = Object.fromEntries(formData.entries());
        const validation = await UpdateProductSchema.safeParseAsync(fields);

        if (!validation.success) throw new Error("Información incorrecta");

        await backend.patch(`/store/products/update/${id}`, validation.data, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        revalidateTag("products-data");

        return {
            result: true,
            message: "Producto actualizado",
        };
        
    } catch (error) {
        console.error("Error en UpdateProduct", error);
        
        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la actualización del producto";
        
        return { result: false, message };
    }
}