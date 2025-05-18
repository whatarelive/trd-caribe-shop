"use server";

import z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth.config";

// Esquema de validación para el formulario de inicio de sesión
const LoginSchema = z.object({
    username: z.string().min(5).max(150).regex(/^[\w.@+-]+$/),
    password: z.string().min(5).max(128).regex(/^[a-zA-Z0-9]+$/),
});

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