import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { fontTitle } from "@/config/fonts";
import { Toaster } from "@/components/ui/sonner";
import { SessionHandler } from "@/components/global/SessionHandler";
import type { ILayout } from "@/interfaces/components";

import "@/app/globals.css";

export const metadata: Metadata = {
    title: "TRD Caribe Shop",
    description: "Tienda Virtual de TRD Caribe",
};

export default async function RootLayout({ children }: ILayout) {  
    return (
        <html lang="es">
            <body className={`${fontTitle.className} antialiased`}>
                {children}

                <SessionProvider>
                    <SessionHandler/>
                </SessionProvider>
                
                <Toaster expand richColors/>
            </body>
        </html>
    );
}
