'use server'

import { revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";


export async function updateUserRole(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) throw new Error("ID invalido");
        
        const session = await auth();
        
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado");
        }
        
        await backend.post(`/user/update-role/${id}`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });
    
        revalidateTag("users-data");
    
        return {
            result: true,
            message: "Rol del usuario actualizado",
        };
   
    } catch (error) {
        console.error("Error en UpdateUserRole", error);

        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la actualización del rol";

        return { result: false, message };
    }
}