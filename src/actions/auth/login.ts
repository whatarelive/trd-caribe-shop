'use server'

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
    const validation = await LoginSchema.safeParseAsync(fields);

    try {
        // Si la validación falla, retornar mensaje de error.
        if (!validation.success) throw new Error("Información incorrectas");

        // Iniciar sesión con las credenciales
        await signIn("credentials", { ...validation.data, redirect: false });

        return {
            result: true,
            message: "Inicio de sesión exitoso",
        };
        
    } catch (error) {
        console.error("Error en Authenticate", error);

        let message = "Error desconocido";

        // Mensaje de error condificional cuando ocurre un problema en la petición
        if (error instanceof Error) message = error.message;
        if (error instanceof AuthError) message = "Credenciales incorrectas";

        return { result: false, message };
    }
}