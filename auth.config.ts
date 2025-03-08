import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { ShopApi } from "@/src/lib/api/shop-api";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const { user, password } = credentials;

                const { data } = await ShopApi.post('/user/login/', { user, password });

                // if (!data) return null;
                
                console.log(data);
                
                // TODO: Falta retornar los tokens y la información del usuario.
                return {
                    // accessToken: data.access,
                    // refreshToken: data.refresh,
                } 
            }
        })
    ]
} satisfies NextAuthConfig;