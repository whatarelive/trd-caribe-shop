"use server"

import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import { UpdateSchema } from "@/actions/auth/validation/user-schema";


export async function updateUser(formData: FormData) {
    const fields = Object.fromEntries(formData.entries());

    const { data, success } = await UpdateSchema.safeParseAsync(fields);

    if (!success) {
        return {
            result: false,
            message: "Información incorrecta"
        };
    }

    const session = await auth();

    try {
        if (!session || !session.user) {
            throw new Error("Usuario no Autorizado", { cause: "Unatorized User 401" });
        }
        
        await backend.put(`/user/update/`, { ...data }, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        return {
            result: true,
            message: "Perfil actualizado exitosamente",
        }
        
    } catch (error) {
        const message = (error as Error).cause !== "Unatorized User 401" 
            ? "Fallo la actualización del perfil"
            : (error as Error).message;

        return { result: false, message };
    }
}



export async function updateUserRole(id: number) {
    const session = await auth();

    try {
        if (!session || !session.user || !session.user.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unatorized User 401" });
        }
        
        await backend.put(`/user/update-role/${id}`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        return {
            result: true,
            message: "Rol del usuario actualizado",
        }
        
    } catch (error) {
        const message = (error as Error).cause !== "Unatorized User 401" 
            ? "Fallo la actualización del rol"
            : (error as Error).message;

        return { result: false, message };
    }
}