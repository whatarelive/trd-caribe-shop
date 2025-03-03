import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "@/auth.config";

// Define las rutas de autenticación y las rutas públicas.
const authRoutes = ['/auth/login', '/auth/register'];
const publicRoutes = ['/', ...authRoutes];

// Configura el middleware de autenticación usando NextAuth.
const { auth: middleware } = NextAuth(authConfig);

// Exporta el middleware con la lógica de protección de rutas.
export default middleware(({ nextUrl, auth }) => {
    // Verifica si el usuario está autenticado.
    const isLoggedIn = !!auth;

    console.log(isLoggedIn);
    

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