'use server'

import { AuthError } from "next-auth";
import { signIn } from "@/auth.config";
import { service } from "@/config/api";
import { RegisterSchema } from "@/actions/auth/validation/user-schema";
import { userFormatAPI } from "@/actions/users/adapters/users-adapters";
import { BadRequestException, HttpException } from "@/lib/error-adapter";


/**
 * Crea un nuevo usuario y realiza el inicio de sesión automático
 * @param formData - Datos del formulario de registro
 * @returns Objeto con el mensaje de error o confirmación.
 */
export async function createUser(formData: FormData) {
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());

    // Validar los datos usando Zod schema para asegurar que cumplen con el formato requerido
    const { data, success } = await RegisterSchema.safeParseAsync(fields);
    
    try {
        // Si la validación falla, retornar mensaje de error
        if (!success) throw new BadRequestException();
    
        // Intentar crear el usuario en el backend mediante una petición POST
        const response = await service.post("/user/register/", 
            userFormatAPI(data), 
            {
                isProtected: false,
                error: "Fallo el registro del usuario",
            }
        );

        // Se parsea la respuesta
        const body = await response.json();

        // Si el registro es exitoso, iniciar sesión automáticamente con las credenciales
        await signIn("credentials", { ...body, redirect: false });

        // Mensaje de confirmación
        return {
            result: true,
            message: "Registro e inicio de sesión exitoso",
        }
        
    } catch (error) {
        console.error("Error en CreateUser", error);

        let message = "Error desconocido";

        // Mensaje de error condificional cuando ocurre un problema en la petición
        if (error instanceof HttpException) message = error.message;        
        if (error instanceof AuthError) message = "Fallo el inicio de sesión";

        return { result: false, message };
    }
}