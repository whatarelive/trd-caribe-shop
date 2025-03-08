import Credentials from "next-auth/providers/credentials";
import { shopApi } from "@/src/lib/api/shop-api";
import type { NextAuthConfig } from "next-auth";
import type { UserLogin, UserRegister } from "@/src/types/models";

// Tipo de usuario que puede ser tanto para login como para registro
type User = UserLogin | UserRegister; 

/**
 * Verifica si el usuario es de tipo registro comprobando si tiene token
 * @param user Usuario a verificar
 * @returns true si es un usuario de registro, false si es de login
 */
function isRegisterUser(user: User): user is UserRegister {
    return (user as UserRegister).token !== undefined;   
}

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                // Si no hay credenciales, retornar null
                if (!credentials) return null;

                // Convertir credentials a tipo User de forma segura
                const user = credentials as unknown as User;

                if (isRegisterUser(user)) {
                    // Si es un usuario registrado, retornar los tokens y datos del usuario
                    return {
                        username: user.username,
                        isAdmin: false,
                        accessToken: user.token.access,
                        refreshToken: user.token.refresh
                    }

                } else {
                    // Si es un intento de login, hacer la petición al endpoint de login
                    const { data } = await shopApi.post('/user/login/', { ...user });

                    // Si no hay datos en la respuesta, retornar null
                    if (!data) return null;
                    
                    // Retornar los datos del usuario y sus tokens de acceso
                    return {
                        username: user.username,
                        isAdmin: data.is_admin,
                        accessToken: data.access,
                        refreshToken: data.refresh
                    }
                }
            }
        })
    ]
} satisfies NextAuthConfig;