"use server"; // Indica que esta función se ejecuta en el servidor

// Importaciones necesarias para el registro y autenticación
import { signIn } from "@/auth";
import { ShopApi } from "@/src/lib/api/shop-api";
import { LoginSchemaWithEmail, LoginSchemaWithUserName, RegisterSchema } from "@/src/lib/validations/auth-schema";
import type { LoginState, RegisterState } from "@/src/types/actions-props";
import type { User } from "@/src/types/models";

/**
 * Crea un nuevo usuario y realiza el inicio de sesión automático
 * @param _prevState - Estado anterior del formulario (no utilizado)
 * @param formData - Datos del formulario de registro
 * @returns Objeto con errores si falla la validación o el registro, o redirige si es exitoso
 */
async function createUser(_prevState: RegisterState, formData: FormData) {
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());
    
    // Validar los datos usando Zod schema para asegurar que cumplen con el formato requerido
    const { success, data, error } = RegisterSchema.safeParse(fields);

    // Si la validación falla, retornar los errores específicos de cada campo
    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
            message: "Error de Registro",
        }
    }

    // Extraer los datos validados para crear el usuario
    const { first_name, last_name, email, username, password } = data;

    try {
        // Intentar crear el usuario en el backend mediante una petición POST
        const { data: response, status } = await ShopApi.post<User>("/user/register/", {
            first_name, last_name, email, username, password
        });

        // Verificar si la creación fue exitosa (código 201 Created)
        if (status !== 201) {
            throw new Error("Error al registrar el usuario");
        } 

        // Si el registro es exitoso, iniciar sesión automáticamente con las credenciales
        return await signIn("credentials", response);
        
    } catch (error) {
        // Registrar el error en la consola para debugging
        console.log(error);
        
        // Si falla el registro, retornar un mensaje de error genérico
        return {
            errors: {},
            message: "Error al crear la cuenta"
        }
    }
}

/**
 * Verifica el usuario y realiza el inicio de sesión automático
 * @param _prevState - Estado anterior del formulario (no utilizado)
 * @param formData - Datos del formulario de inicio de sesión
 * @returns Objeto con errores si falla la validación o el inicio, o redirige si es exitoso
 */
async function verifyUser(_prevState: LoginState, formData: FormData) {
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());
    
    // Determinar si estamos usando email o username basado en los campos presentes
    const isUsingEmail = "email" in fields;
    
    // Validar los datos usando el schema apropiado
    const { data, success, error } = isUsingEmail
        ? LoginSchemaWithEmail.safeParse(fields)
        : LoginSchemaWithUserName.safeParse(fields);

    // Si la validación falla, retornar los errores específicos de cada campo
    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
            message: "Error de inicio de sesión",
        }
    }

    // Preparar los datos para el inicio de sesión
    const loginData = {
        user: isUsingEmail ? data.email : data.username,
        password: data.password
    };

    // Inicio sesión con las credenciales
    return await signIn("credentials", loginData);
}

// Exportar la función para su uso en componentes
export {
    createUser,
    verifyUser,
}