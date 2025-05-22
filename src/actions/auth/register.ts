'use server'

import { AuthError } from "next-auth";
import { isAxiosError } from "axios";
import { signIn } from "@/auth.config";
import { backend } from "@/config/api";
import { RegisterSchema } from "@/actions/auth/validation/user-schema";
import type { UserRegister } from "@/interfaces/models/user.interface";


/**
 * Crea un nuevo usuario y realiza el inicio de sesión automático
 * @param formData - Datos del formulario de registro
 * @returns Objeto con el mensaje de error o confirmación.
 */
export async function createUser(formData: FormData) {
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());

    // Validar los datos usando Zod schema para asegurar que cumplen con el formato requerido
    const validation = await RegisterSchema.safeParseAsync(fields);
    
    try {
        // Si la validación falla, retornar mensaje de error
        if (!validation.success) throw new Error("Información incorrecta");
    
        // Extraer los datos validados para crear el usuario
        const { passwordConfirm: _, ...rest } = validation.data;

        // Intentar crear el usuario en el backend mediante una petición POST
        const { data } = await backend.post<UserRegister>("/user/register/", { ...rest });

        // Si el registro es exitoso, iniciar sesión automáticamente con las credenciales
        await signIn("credentials", { ...data, redirect: false });

        // Mensaje de confirmación
        return {
            result: true,
            message: "Registro exitoso",
        }
        
    } catch (error) {
        console.error("Error en CreateUser", error);

        let message = "Error desconocido";

        // Mensaje de error condificional cuando ocurre un problema en la petición
        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo el registro"        
        if (error instanceof AuthError) message = "Fallo el inicio de sesión";

        return { result: false, message };
    }
}