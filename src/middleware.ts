import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { auth as Session } from "@/auth";
import authConfig from "@/auth.config";

// Define las rutas de autenticación y las rutas públicas.
const authRoutes = ['/auth/login', '/auth/register'];
const publicRoutes = ['/', ...authRoutes];

// Configura el middleware de autenticación usando NextAuth.
const { auth: middleware } = NextAuth(authConfig);

// Exporta el middleware con la lógica de protección de rutas.
export default middleware( async({ nextUrl, auth }) => {
    // Verifica si el usuario está autenticado.
    const isLoggedIn = !!auth;  
    
    // Proteccioón de las rutas del DashBoard
    if (nextUrl.pathname.startsWith("/admin") && isLoggedIn) {
        // Se recupera la sesión del usuario.
        const session = await Session();
        
        // Si el usuario es Admin se deja pasar la petición
        if (session?.user?.isAdmin) {
            return NextResponse.next();
        } 
        
        // Si no se redirecciona a la página pública
        else return NextResponse.redirect(new URL("/", nextUrl));
    }

    // Se ignoran los archivos con esa extensión
    if (nextUrl.pathname.includes('.png') || nextUrl.pathname.includes('.jpg')) {
        return NextResponse.next();
    }    

    // Protección de rutas privadas.
    if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    // Restricción de rutas de autentificación.
    if (authRoutes.includes(nextUrl.pathname) && isLoggedIn) {
        return NextResponse.redirect(new URL("/", nextUrl));
    }

    return NextResponse.next();
});

// Configuración del middleware para que se ejecute en todas las rutas excepto las API, archivos estáticos, imágenes y archivos PNG
export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.svg|.png).*)'],
}