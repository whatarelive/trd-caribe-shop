"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth.config";
import { LoginSchema } from "@/actions/auth/validation/user-schema";


/**
 * Verifica el usuario y realiza el inicio de sesión automático.
 * @param formData - Datos del formulario de inicio de sesión.
 * @returns Objeto con el mensaje de error o confirmación.
 */
export async function autheticate(formData: FormData) {
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());
    
    // Validar los datos usando el schema apropiado
    const { data, success } = await LoginSchema.safeParseAsync(fields);

    // Si la validación falla, retornar mensaje de error.
    if (!success) {
        return {
            result: false,
            message: "Credenciales incorrectas",
        }
    }

    try {
        // Iniciar sesión con las credenciales
        await signIn("credentials", { ...data, redirect: false });

        return {
            result: true,
            message: "Inicio de sesión exitoso",
        };
        
    } catch (error) {
        // Mensaje de error condificional cuando ocurre un problema en la petición
        const message = error instanceof AuthError 
            ? "Credenciales incorrectas"
            : "Conexión fallida";

        return { result: false, message };
    }
}