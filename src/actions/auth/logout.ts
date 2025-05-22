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
        // Se comprueba la validez de la sesión del usuario
        if (!session || !session.accessToken) throw new Error("Usuario no autorizado");

        // Petición http al Backend
        await backend.post("/user/logout/", { refresh: session.refreshToken }, { 
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        // Se cierra la sesión en el servidor del frontend
        await signOut({ redirect: false });
    
        return {
            result: true,
            message: "Sesión cerrada",
        };
    
    } catch (error) {
        // Si el codigo devuelto es 401 el token es invalido y se cierra la sesión automaticamente
        if (isAxiosError(error) && error.response?.status === 401) {
            // Se cierra la sesión de lado del servidor del frontend
            await signOut({ redirect: false });
            
            return {
                result: true,
                message: "Sesión cerrada",
            };
        }

        console.error("Error en Logout", error);

        let message = "Error desconocido";
        
        if (error instanceof Error) message = error.message;
        if (isAxiosError(error) && error.response?.status !== 401) message = "Fallo el cierre de sesión";
        
        return { result: false, message };
    }
}