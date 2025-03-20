"use server"; // Indica que esta función se ejecuta en el servidor

import z from "zod";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth.config";
import type { LoginState } from "@/interfaces/models/user.interface";

// Esquema de validación para el formulario de inicio de sesión
const LoginSchema = z.object({
    username: z.string()
        .min(5, "El nombre de usuario es requerido")
        .max(150, "El nombre de usuario debe tener 150 caracteres o menos")
        .regex(/^[\w.@+-]+$/, "Solo se permiten letras, números y los caracteres @/./+/-/_"),
    password: z.string()
        .min(5, "La contraseña es requerida")
        .max(128, "La contraseña debe tener 128 caracteres o menos")
        .regex(/^[a-zA-Z0-9]+$/, "La contraseña solo puede contener letras y números")
});

/**
 * Verifica el usuario y realiza el inicio de sesión automático
 * @param _prevState - Estado anterior del formulario (no utilizado)
 * @param formData - Datos del formulario de inicio de sesión
 * @returns Objeto con errores si falla la validación o el inicio, o redirige si es exitoso
 */
export async function autheticate(_prevState: LoginState, formData: FormData) {
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());
    
    // Validar los datos usando el schema apropiado
    const { data, success, error } = LoginSchema.safeParse(fields);

    // Si la validación falla, retornar los errores específicos de cada campo
    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
        }
    }

    try {
        // Inicio sesión con las credenciales
        await signIn("credentials", { ...data, redirect: false });
        
    } catch (error) {
        // Mensaje de error que se envia al usuario 
        const message = error instanceof AuthError 
        ? ["Fallo el inicio de sesión"] 
        : ["Error de conexión"];    

        // Mensaje de error condificional cuando ocurre un problema en la petición
        return { 
            errors: { email: message, password: message } 
        }
    }

    // Si se realiza la autentificación correctamente
    // se redirecciona al usuario a la página principal 
    redirect("/");
}