'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { UpdateSchema } from "@/actions/auth/validation/user-schema";
import { BadRequestException, HttpException } from "@/lib/error-adapter";


export async function updateUser(formData: FormData) {
    const fields = Object.fromEntries(formData.entries());
    const { data, success } = await UpdateSchema.safeParseAsync(fields);
    
    try {
        if (!success) throw new BadRequestException();

        await service.update("/user/update-profile/", data, {
            error: "Fallo la actualización del perfil",
        });

        revalidateTag("users-data");
        
        return {
            result: true,
            message: "Perfil actualizado",
        };
        
    } catch (error) {
        console.error("Error en UpdateUser", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}
