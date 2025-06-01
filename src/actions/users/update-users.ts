'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { UpdateSchema } from "@/actions/auth/validation/user-schema";
import { userFormatAPI } from "@/actions/users/adapters/users-adapters";


export async function updateUser(formData: FormData) {
    const fields = Object.fromEntries(formData.entries());
    const { data, success } = await UpdateSchema.safeParseAsync(fields);
    
    try {
        if (!success) throw new BadRequestException();

        await service.update("/user/update-profile/", 
            userFormatAPI(data), 
            { error: "Fallo la actualización del perfil" },
        );

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
