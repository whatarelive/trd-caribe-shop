import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { shopApi } from "@/src/lib/api/shop-api";
import { isRegisterUser } from "@/src/lib/utils/type-guards";
import type { UserLogin, UserRegister } from "@/src/types/models";

// Type de la petición de login del usuario.
type LoginPost = {
    is_admin: boolean; // rol del usuario
    access: string; // token de acceso
    refresh: string; // token de refresh
}

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                // Si no hay credenciales, retornar null
                if (!credentials) return null;

                // Convertir credentials a tipo User de forma segura
                const user = credentials as unknown as UserLogin | UserRegister;

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
                    const { data } = await shopApi.post<LoginPost, UserLogin>('/user/login/', { ...user });

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