import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
// import { ShopApi } from "@/src/lib/api/shop-api";

interface ICredentials {
    user?: string;
    password?: string;
    accessToken?: string;
    refreshToken?: string;
    action: "SingIn" | "LogIn";
} 

export default {
    providers: [
        Credentials({
            async authorize(credentials: Partial<ICredentials>) {
                // const { user, password } = credentials;

                // TODO: > Falta establecer la configuración de la Api. 
                // const { data } = await ShopApi.post('/login/', { user, password });

                // if (!data) return null;
                
                // TODO: Falta retornar los tokens y la información del usuario.
                return {
                    // accessToken: data.access,
                    // refreshToken: data.refresh,
                } 
            }
        })
    ]
} satisfies NextAuthConfig;