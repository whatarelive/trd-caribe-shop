import type { Metadata } from "next";
import { auth } from "@/auth.config";
import { fontTitle } from "@/config/fonts";
import { logout } from "@/actions/auth/logout";
import type { ILayout } from "@/interfaces/components";

import "@/app/globals.css";

export const metadata: Metadata = {
    title: "TRD Caribe Shop",
    description: "Tienda Virtual de TRD Caribe",
};

export default async function RootLayout({ children }: ILayout) {
    // Se recupera la sesión del usuario
    const session = await auth();

    // Se comprueba la sesión del usuario
    // Debido q que si el servidor se apaga, la sesión de auth js se matiene viva
    // Por lo que se debe cerrar la sesión
    if (session?.isAuthenticated === false) {
        // Si el usuario no está autenticado, se cierra la sesión
        await logout();   
    }

    return (
        <html lang="es">
            <body className={`${fontTitle.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
