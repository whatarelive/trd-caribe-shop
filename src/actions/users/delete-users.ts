"use server";

import { revalidateTag } from "next/cache";
import { auth, signOut } from "@/auth.config";
import { backend } from "@/config/api";


export async function deleteUser() {
    const session = await auth();
    
    try {
        if (!session || !session.user) {
            throw new Error("Usuario no Autorizado", { cause: "Unauthorized_Access" });
        }
        
        await backend.delete(`/user/delete/`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        await signOut({ redirect: false });
        
    } catch (error) {
        const message = (error as Error).cause !== "Unauthorized_Access" 
        ? "Fallo la eliminación del usuario"
        : (error as Error).message;
        
        return { result: false, message };
    }

    revalidateTag("users-data");

    return {
        result: true,
        message: "Usuario eliminado exitosamente",
    }
}