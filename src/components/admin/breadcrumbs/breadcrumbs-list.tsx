"use client"

import { usePathname } from "next/navigation";
import { generateBreadcrumbs } from "@/src/lib/utils/navigation";
import { BreadcrumbItem } from "./breadcrumb-item";

/**
 * Componente de navegación que muestra la ruta actual en forma de migas de pan.
 * 
 * Características:
 * - Genera automáticamente las migas de pan basadas en la ruta actual
 * - Solo visible en pantallas desktop (lg:block)
 * - Utiliza usePathname para tracking de la ruta
 * - Renderiza cada segmento de ruta como un BreadcrumbItem
 * - Manejo de casos vacíos (no renderiza si no hay breadcrumbs)
 * - Accesible con aria-label para lectores de pantalla
 */
export const BreadcrumbsList = () => {
    // Obtener la ruta actual
    const pathname = usePathname();

    // Generar las migas de pan basadas en la ruta actual
    const breadcrumbs = generateBreadcrumbs(pathname);

    // No renderizar si no hay breadcrumbs
    if (!breadcrumbs.length) return null;

    return (
        <nav aria-label="breadcrumb" className="hidden lg:block">
            <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                {breadcrumbs.map((breadcrumb, index) => (
                    <BreadcrumbItem
                        key={index}
                        breadcrumb={breadcrumb}
                        isLast={breadcrumbs.length === index + 1}
                        index={index}
                        totalItems={breadcrumbs.length}
                    />
                ))}
            </ol>
        </nav>
    );
};