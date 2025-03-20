"use server"; // Indica que esta función se ejecuta en el servidor

import { auth, signOut } from "@/auth.config";
import { shopApi } from "@/lib/api/shop-api";
import type { ResquestLogout } from "@/interfaces/models/user.interface";

/** 
 * @description Acción de servidor para manejar el cierre de la sesión,
 * envia una petición a la API para poner en lista negra el token de refresh.
*/
export async function logout() {
    // Se recupera la sesión actual
    const session = await auth();

    try {
        // Petición http al Backend
        const resp = await shopApi.post<never, ResquestLogout>(
            // url de la request 
            "/user/logout/", 
            // data de la request
            { refresh: session?.refreshToken },
            // token de acceso para pasar la seguridad
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        // Si el codigo devuelto no es el esperado
        if (resp.status !== 200) {
            // Se lanza el error de cierre de sesión
            throw new Error("Fallo el cierre de sesión");
        }

    } catch (error) {
        // Se propaga el error a la ui, para el manejo en el cliente
        return error;
    }

    // Si se realiza el cierre de sesión el backend correctamente
    // se cierra la sesión en el Frontend y redirecciona al usuario a la página principal 
    return await signOut(); 
}