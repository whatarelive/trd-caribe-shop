"use server";

import { auth, signOut } from "@/auth.config";
import { backend } from "@/config/api";


export async function deleteUser() {
    const session = await auth();
    
    try {
        if (!session || !session.user) {
            throw new Error("Usuario no Autorizado", { cause: "Unatorized User 401" });
        }
        
        await backend.delete(`/user/delete/`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        await signOut({ redirect: false });

        return {
            result: true,
            message: "Usuario eliminado exitosamente",
        }
        
    } catch (error) {
        const message = (error as Error).cause !== "Unatorized User 401" 
            ? "Fallo la eliminación del usuario"
            : (error as Error).message;

        return { result: false, message };
    }
}