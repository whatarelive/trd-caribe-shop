'use server'

import { revalidateTag } from "next/cache";
import { AuthError } from "next-auth";
import { signOut } from "@/auth.config";
import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";


export async function deleteUser() {
    try {    
        await service.delete(`/user/delete/`, {
            error: "Fallo la eliminación del usuario",
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

        if (error instanceof HttpException) message = error.message; 
        if (error instanceof AuthError) message = "Fallo el cierre de sessión";

        return { result: false, message };
    }
}