"use server"; // Indica que esta función se ejecuta en el servidor

// Importaciones necesarias para el registro y autenticación
import { auth, signIn, signOut } from "@/auth";
import { shopApi } from "@/src/lib/api/shop-api";
import { LoginSchema, RegisterSchema } from "@/src/lib/validations/auth-schema";
import type { LoginState, RegisterState } from "@/src/types/actions-props";
import type { UserRegister } from "@/src/types/models";

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
        const { data: response, status } = await shopApi.post<UserRegister>("/user/register/", {
            first_name, last_name, email, username, password
        });

        // Verificar si la creación fue exitosa (código 201 Created)
        if (status !== 201) {
            throw new Error("Error al registrar el usuario");
        } 

        // Si el registro es exitoso, iniciar sesión automáticamente con las credenciales
        return await signIn("credentials", { ...response, redirect: false });
        
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
    
    // Validar los datos usando el schema apropiado
    const { data, success, error } = LoginSchema.safeParse(fields);

    // Si la validación falla, retornar los errores específicos de cada campo
    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
            message: "Error de inicio de sesión",
        }
    }

    // Inicio sesión con las credenciales
    return await signIn("credentials", data);
}

/**
 * Cierra la sesión del usuario actual
 * @returns Promise que resuelve con el resultado del cierre de sesión o un objeto con el error
 * Si es exitoso, elimina la sesión del cliente y del servidor
 * Si falla, retorna un objeto con el mensaje de error
 */
async function logoutUser() {
    try {
        // Obtener la sesión actual
        const session = await auth();

        // Realizar la petición al backend para cerrar la sesión
        const { status } = await shopApi.post("/user/logout/", 
            { refresh: session?.refreshToken },
            {
                headers: { 
                    Authorization: `Bearer ${session?.accessToken}` 
                }
            }
        );

        // Verificar si la petición fue exitosa
        if (status !== 205) throw new Error("No se pudo cerrar la sesión");
        
    } catch (error) {
        // Registrar cualquier error que ocurra durante el proceso
        console.log(error);
        
        // Retornar un objeto con información sobre el error
        return {
            success: false,
            message: "Error al cerrar la sesión. Por favor, intente nuevamente."
        }
    }
    
    // Si el logout en el backend es exitoso, cerrar la sesión en el cliente
    return await signOut({ redirectTo: "/" });
}

// Exportar la función para su uso en componentes
export {
    createUser,
    verifyUser,
    logoutUser
}