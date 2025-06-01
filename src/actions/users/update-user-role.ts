'use server'

import { revalidateTag } from "next/cache";
import { auth } from "@/auth.config";
import { service } from "@/config/api";
import { userFormatAPI } from "@/actions/users/adapters/users-adapters";
import { BadRequestException, HttpException } from "@/lib/error-adapter";


export async function updateUserRole(id: number, username: string) {
    const session = await auth();
    
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }
            
        if (!session || !session.user || username === session.user.username) {
            throw new BadRequestException("No puedes cambiar el rol de tu usuario");
        }

        await service.update(`/user/change-role/${id}`, 
            userFormatAPI({ username }), 
            { error: "Fallo la actualización del rol" },
        );
    
        revalidateTag("users-data");
    
        return {
            result: true,
            message: "Rol del usuario actualizado",
        };
   
    } catch (error) {
        console.error("Error en UpdateUserRole", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido",
        };
    }
}