'use server'

import { revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import { UpdateSchema } from "@/actions/auth/validation/user-schema";


export async function updateUser(formData: FormData) {
    const session = await auth();
    
    try {
        if (!session || !session.accessToken) throw new Error("Usuario no Autorizado");
        
        const fields = Object.fromEntries(formData.entries());
        const validation = await UpdateSchema.safeParseAsync(fields);
    
        if (!validation.success) throw new Error("Información incorrecta");
        
        await backend.put(`/user/update/`, validation.data, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        revalidateTag("users-data");
        
        return {
            result: true,
            message: "Perfil actualizado",
        };
        
    } catch (error) {
        console.error("Error en UpdateUser", error);

        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la actualización del perfil";

        return { result: false, message };
    }
}
