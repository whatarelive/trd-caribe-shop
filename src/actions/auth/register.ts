"use server"

import z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth.config";
import { shopApi } from "@/lib/api/shop-api";
import type { RequestRegister, UserRegister } from "@/interfaces/models/user.interface";


// Esquema de validación para el formulario de registro del usuario.
const RegisterSchema = z.object({
    username: z.string()
        .min(5, "El nombre de usuario es requerido")
        .max(150, "El nombre de usuario debe tener 150 caracteres o menos")
        .regex(/^[\w.@+-]+$/, "Solo se permiten letras, números y los caracteres @/./+/-/_"),
    email: z.string()
        .email("Dirección de correo electrónico inválida")
        .max(254, "El correo electrónico debe tener 254 caracteres o menos"),
    first_name: z.string()
        .min(5, "El nombre es requerido")
        .max(150, "El nombre debe tener 150 caracteres o menos"),
    last_name: z.string()
        .min(5, "El apellido es requerido")
        .max(150, "El apellido debe tener 150 caracteres o menos"),
    password: z.string()
        .min(5, "La contraseña es requerida")
        .max(128, "La contraseña debe tener 128 caracteres o menos")
        .regex(/^[a-zA-Z0-9]+$/, "La contraseña solo puede contener letras y números"),
    passwordConfirm: z.string()
        .min(5, "La confirmación de contraseña es requerida")

}).refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"]
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
        const { data: response, status } = await shopApi.post<UserRegister, RequestRegister>(
            "/user/register/", 
            { ...rest }
        );

        // Verificar si la creación fue exitosa (código 201 Created)
        if (status !== 201) {
            throw new Error("Error al registrar el usuario");
        } 

        // Si el registro es exitoso, iniciar sesión automáticamente con las credenciales
        await signIn("credentials", { ...response, redirect: false });

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