import type { Metadata } from "next";
import { auth } from "@/auth.config";
import { fontTitle } from "@/src/config/fonts";
import { logoutUser } from "@/src/lib/actions/auth";
import type { ILayout } from "@/src/types/components";

import "@/src/styles/globals.css";

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
    if (session && session?.isAuthenticated === false) {
        // Si el usuario no está autenticado, se cierra la sesión
        await logoutUser();   
    }

    return (
        <html lang="es">
            <body className={`${fontTitle.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
