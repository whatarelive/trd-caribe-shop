import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { ShopApi } from "@/src/lib/api/shop-api";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    
    // Configuración de las páginas de autenticación
    pages: {
        signIn: "/auth/login",
    },

    // Configuración de la estrategia de sesión
    session: { 
        strategy: "jwt",
    },

    // Callbacks para personalizar el comportamiento de la autenticación
    callbacks: {
        // Callback que se ejecuta después del inicio de sesión para manejar la redirección
        async redirect({ baseUrl }) {
            // Redirigir a la ruta raíz después del inicio de sesión
            return baseUrl;
        },

        // Callback que se ejecuta cuando se genera el token JWT
        async jwt({ token, user }) {
            // Si hay un usuario, agrega los tokens de acceso y de refresco al token JWT
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.accessTokenExpires = Date.now() + 60 * 4 * 1000; // 4 minutos de vida
                token.refreshTokenExpires = Date.now() + 6 * 24 * 60 * 60 * 1000; // 6 días de vida
            }

            // Verificar si el token de refresco ha expirado
            if (token.refreshTokenExpires && Date.now() > token.refreshTokenExpires) {
                console.log("El token de refresco ha expirado");
                // Aquí puedes manejar la expiración del token de refresco, por ejemplo, redirigiendo al usuario a la página de inicio de sesión
                token.accessToken = undefined;
                token.refreshToken = undefined;
                token.accessTokenExpires = undefined;
                token.refreshTokenExpires = undefined;
            }

            // Verificar si el token de acceso ha expirado y renovarlo usando el token de refresco
            if (token.refreshTokenExpires && token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
                try {
                    // Intenta renovar el token de acceso usando el token de refresco
                    const { data } = await ShopApi.post("/token/refresh/", { refresh: token.refreshToken });

                    if (!data) throw new Error("Error al renovar el token");

                    // Actualiza el token de acceso y su tiempo de expiración
                    token.accessToken = data.access;
                    token.accessTokenExpires = Date.now() + 60 * 4 * 1000;

                } catch (error) {
                    console.log("Error al renovar el token de acceso", error);
                    // En caso de error, limpia los tokens de acceso
                    token.accessToken = undefined;
                    token.accessTokenExpires = undefined;
                }
            }

            // Retorna el token JWT modificado
            return token;
        },
        
        // Callback que se ejecuta cuando se crea la sesión
        async session({ session, token }) {  
            // Agrega los tokens de acceso y de refresco a la sesión
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            
            // Se establece el estado de la autentificación
            session.isAuthenticated = session.accessToken ? true : false;

            // Retorna la sesión modificada
            return session
        },
    }
});