import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { shopApi } from "@/src/lib/api/shop-api";

// Type de la petición de refresh del token.
type RefreshPost = {
    access: string; // Token de accseso
    refresh?: string; // Token de refresh
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    
    // Configuración de las páginas de autenticación
    pages: {
        signIn: "/auth/login",
    },

    // Configuración de la estrategia de sesión
    session: { 
        strategy: "jwt",
        maxAge: 23 * 60 * 60, // 23 horas en segundos
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
                token.username = user.username;
                token.isAdmin = user.isAdmin;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.accessTokenExpires = Date.now() + 60 * 59 * 1000; // 59 minutos de vida
                token.refreshTokenExpires = Date.now() + 23 * 60 * 60 * 1000; // 23 horas de vida
            }

            // Verificar si el token de refresco ha expirado
            if (token.refreshTokenExpires && Date.now() > token.refreshTokenExpires) {
                console.log("El token de refresco ha expirado - Cerrando sesión");
                // Limpiar TODOS los datos del token para forzar el cierre de sesión
                return {};
            }

            // Verificar si el token de acceso ha expirado y renovarlo usando el token de refresco
            if (token.refreshTokenExpires && token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
                try {
                    // Intenta renovar el token de acceso usando el token de refresco
                    const { data } = await shopApi.post<RefreshPost, Pick<RefreshPost, "refresh">>(
                        "/user/login/refresh/", 
                        { refresh: token.refreshToken }
                    );

                    if (!data) throw new Error("Error al renovar el token");

                    // Actualiza el token de acceso y su tiempo de expiración
                    token.accessToken = data.access;
                    token.accessTokenExpires = Date.now() + 60 * 59 * 1000;

                } catch (error) {
                    console.log("Error al renovar el token de acceso", error);
                    // En caso de error, limpiar todos los datos del token
                    return {};
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

            // Agrega la información del usuario a la sesión
            session.user.username = token.username;
            session.user.isAdmin = token.isAdmin;
            
            // Se establece el estado de la autentificación
            session.isAuthenticated = session.accessToken ? true : false;

            // Retorna la sesión modificada
            return session;
        },
    }
});