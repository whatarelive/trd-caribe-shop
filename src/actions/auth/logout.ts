'use server'

import { isAxiosError } from "axios";
import { backend } from "@/config/api";
import { auth, signOut } from "@/auth.config";

/** 
 * @description Acción de servidor para manejar el cierre de la sesión,
 * envia una petición a la API para poner en lista negra el token de refresh.
*/
export async function logout() {
    // Se recupera la sesión actual
    const session = await auth();

    try {
        // Petición http al Backend
        await backend.post(
            "/user/logout/", 
            { refresh: session?.refreshToken },
            { 
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`, 
                }
            }
        );

        // Se cierra la sesión en el servidor del frontend
        await signOut({ redirect: false });
    
    } catch (error) {
        // Si el error no es de axios se notifica
        if (!isAxiosError(error)) {
            return {
                result: false,
                message: "Fallo el cierre de sesión",
            }
        }

        // Si el codigo devuelto es 401 el token es invalido
        if (error.response?.status === 401) {
            // Se cierra la sesión de lado del servidor del frontend
            await signOut({ redirect: false });
        } else {
            // Mensaje de error si hay un fallo en la petición (statusCode !== 401)
            return {
                result: false,
                message: "Error de conexión",
            }
        }
    }

    return {
        result: true,
        message: "Sesión cerrada",
    };
}