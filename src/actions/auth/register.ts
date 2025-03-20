"use server"; // Indica que esta función se ejecuta en el servidor

import z from "zod";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth.config";
import { shopApi } from "@/lib/api/shop-api";
import type { RegisterState, RequestRegister, UserRegister } from "@/interfaces/models/user.interface";

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
 * @param _prevState - Estado anterior del formulario (no utilizado)
 * @param formData - Datos del formulario de registro
 * @returns Objeto con errores si falla la validación o el registro, o redirige si es exitoso
 */
export async function createUser(_prevState: RegisterState, formData: FormData) {
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());

    // Validar los datos usando Zod schema para asegurar que cumplen con el formato requerido
    const { success, data, error } = RegisterSchema.safeParse(fields);

    // Si la validación falla, retornar los errores específicos de cada campo
    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
        }
    }

    // Extraer los datos validados para crear el usuario
    const { first_name, last_name, email, username, password } = data;

    try {
        // Intentar crear el usuario en el backend mediante una petición POST
        const { data: response, status } = await shopApi.post<UserRegister, RequestRegister>(
            "/user/register/", 
            { first_name, last_name, email, username, password }
        );

        // Verificar si la creación fue exitosa (código 201 Created)
        if (status !== 201) {
            throw new Error("Error al registrar el usuario");
        } 

        // Si el registro es exitoso, iniciar sesión automáticamente con las credenciales
        await signIn("credentials", { ...response, redirect: false });
        
    } catch (error) {
         // Mensaje de error que se envia al usuario 
        const message = error instanceof AuthError 
        ? ["Fallo el inicio de sesión"] 
        : ["Fallo el registro"];    

        // Mensaje de error cuando ocurre un problema en la petición
        return { 
            errors: { email: message, password: message } 
        }
    }
    
    // Si se realiza la autentificación correctamente
    // se redirecciona al usuario a la página principal 
    redirect("/");
}