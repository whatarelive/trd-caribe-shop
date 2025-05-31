'use server'

import { service } from "@/config/api";
import { auth, signOut } from "@/auth.config";
import { HttpException, SessionException } from "@/lib/error-adapter";

/** 
 * @description Acción de servidor para manejar el cierre de la sesión,
 * envia una petición a la API para poner en lista negra el token de refresh.
*/
export async function logout() {
    const session = await auth();

    try {
        // Petición http al Backend
        await service.post("/user/logout/", 
            { refresh: session?.refreshToken }, 
            {
                isProtected: true,
                error: "Fallo el cierre de sesión", 
            }
        );

        // Se cierra la sesión en el servidor del frontend
        await signOut({ redirect: false });
    
        return {
            result: true,
            message: "Sesión cerrada",
        };
    
    } catch (error) {
        // Si el codigo devuelto es 401 el token es invalido y se cierra la sesión automaticamente
        if (error instanceof SessionException) {
            // Se cierra la sesión de lado del servidor del frontend
            await signOut({ redirect: false });
            
            return {
                result: true,
                message: "Sesión cerrada",
            };
        }

        console.error("Error en Logout", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido",
        };
    }
}