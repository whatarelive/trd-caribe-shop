import type { Metadata } from "next";
import { fontTitle } from "@/config/fonts";
import type { ILayout } from "@/interfaces/components";

import "@/app/globals.css";

export const metadata: Metadata = {
    title: "TRD Caribe Shop",
    description: "Tienda Virtual de TRD Caribe",
};

export default function RootLayout({ children }: ILayout) {
    return (
        <html lang="es">
            <body className={`${fontTitle.className} antialiased relative`}>
                {children}
            </body>
        </html>
    );
}
