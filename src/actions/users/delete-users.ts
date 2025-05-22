'use server'

import { revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth, signOut } from "@/auth.config";
import { backend } from "@/config/api";


export async function deleteUser() {
    const session = await auth();
    
    try {
        if (!session || !session.accessToken) throw new Error("Usuario no Autorizado");
        
        await backend.delete(`/user/delete/`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        await signOut({ redirect: false });
        
        revalidateTag("users-data");
    
        return {
            result: true,
            message: "Usuario eliminado exitosamente",
        };

    } catch (error) {
        console.error("Error en DeleteUser", error);

        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la eliminación del usuario";
        
        return { result: false, message };
    }

}