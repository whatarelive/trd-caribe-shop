"use server"

import z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth.config";
import type { UserRegister } from "@/interfaces/models/user.interface";
import { backend } from "@/config/api";


// Esquema de validación para el formulario de registro del usuario.
const RegisterSchema = z.object({
    username: z.string().min(5).max(150).regex(/^[\w.@+-]+$/),
    email: z.string().email().max(254),
    first_name: z.string().min(5).max(150),
    last_name: z.string().min(5).max(150),
    password: z.string().min(5).max(128).regex(/^[a-zA-Z0-9]+$/),
    passwordConfirm: z.string().min(5),

}).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
});

/**
 * Crea un nuevo usuario y realiza el inicio de sesión automático
 * @param formData - Datos del formulario de registro
 * @returns Objeto con el mensaje de error o confirmación.
 */
export async function createUser(formData: FormData) {
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());

    // Validar los datos usando Zod schema para asegurar que cumplen con el formato requerido
    const { success, data } = await RegisterSchema.safeParseAsync(fields);

    // Si la validación falla, retornar mensaje de error
    if (!success) {
        return {
            result: false,
            message: "Información incorrecta"
        }
    }

    // Extraer los datos validados para crear el usuario
    const { passwordConfirm: _, ...rest } = data;

    try {
        // Intentar crear el usuario en el backend mediante una petición POST
        const { data, status } = await backend.post<UserRegister>("/user/register/", { ...rest });

        // Verificar si la creación fue exitosa (código 201 Created)
        if (status !== 201) throw new Error("Error al registrar el usuario");

        // Si el registro es exitoso, iniciar sesión automáticamente con las credenciales
        await signIn("credentials", { ...data, redirect: false });

        // Mensaje de confirmación
        return {
            result: true,
            message: "Registro exitoso",
        }
        
    } catch (error) {
        // Mensaje de error que se envia al usuario 
        const message = error instanceof AuthError 
            ? "Fallo el inicio de sesión" 
            : "Fallo el registro";    

        return { result: false, message };
    }
}