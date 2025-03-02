import type { Metadata } from "next";
import { fontTitle } from "@/src/config/fonts";
import type { ILayout } from "@/src/types/components";

import "@/src/components/styles/globals.css";

export const metadata: Metadata = {
  title: "TRD Caribe Shop",
  description: "Tienda Virtual de TRD Caribe",
};

export default function RootLayout({ children }: ILayout) {
  return (
    <html lang="es">
      <body className={`${fontTitle.className}`}>
        {children}
      </body>
    </html>
  );
}
