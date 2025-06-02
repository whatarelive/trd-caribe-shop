import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { service } from "@/config/api";
import { SessionException } from "@/lib/error-adapter";
import { loginFromAPI, registerFromAPI, newTokenFromAPI } from "@/actions/auth/adapters/auth-adapters";
import type { UserLogin, UserRegister } from "@/interfaces/models/user.interface";


// Declaración de la configuración de autentificación
export const authConfig: NextAuthConfig = {
    // Configuración de las páginas de autenticación
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
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
                return { ...token, ...user };
            
            } else if (Date.now() < token.accessTokenExpires!) {
                return token;
            
            } else {
                try {
                    // Validación del tiempo de expiración del token de refresh
                    if (!token.refreshTokenExpires) throw new SessionException();
                    if (token.refreshTokenExpires < Date.now()) throw new SessionException();

                    // Intenta renovar el token de acceso usando el token de refresco
                    const response = await service.post("/user/login/refresh/", 
                        { refresh: token.refreshToken },
                        { 
                            isProtected: false, 
                            error: "Fallo la renovación del token",
                        },
                    );

                    // Mapeo de la respuesta
                    const newToken = newTokenFromAPI((await response.json()));

                    // Actualiza el token de acceso y su tiempo de expiración
                    token.accessToken = newToken.accessToken;
                    token.refreshToken = newToken.refreshToken;
                    token.accessTokenExpires = Date.now() + 60 * 59 * 1000;

                    return token;

                } catch (error) {
                    console.error("Error al renovar el token de acceso", error);
                    token.error = error as Error;
                    // En caso de error, limpiar todos los datos del token
                    return token;
                }
            }
        },
        
        // Callback que se ejecuta cuando se crea la sesión
        async session({ session, token }) {  
            // Agrega los tokens de acceso y de refresco a la sesión
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            // Agrega la información del usuario a la sesión
            session.user.username = token.username;
            session.user.email = token.email!;
            session.user.fullName = token.fullName;
            session.user.isAdmin = token.isAdmin;
            
            session.error = token.error;
            // Se establece el estado de la autentificación
            session.isAuthenticated = token.accessToken ? true : false;

            // Retorna la sesión modificada
            return session;
        },
    },

    // Provedores de autentificación
    providers: [
        Credentials({
            async authorize(credentials) {
                // Si no hay credenciales, retornar null
                if (!credentials) return null;

                // Convertir credentials a tipo User de forma segura
                const user = credentials as unknown as UserLogin | UserRegister;

                // Si es un usuario registrado, retornar los tokens y datos del usuario
                if ((user as UserRegister).token !== undefined) {
                    return registerFromAPI(user);
                }

                // Si es un intento de login, hacer la petición al endpoint de login
                // Si falla la petición el error se controla en la server action.
                const response = await service.post("/user/login/", 
                    { ...user }, 
                    { 
                        isProtected: false, 
                        error: "Error al iniciar sesión",
                    },
                );

                // Retornar los datos del usuario y sus tokens de acceso
                return loginFromAPI((await response.json()));
            }
        })
    ]
};

// Exportación de los métodos y declaración de controladores 
export const { handlers, auth, signIn, signOut } = NextAuth( authConfig );