"use client"

import { useCallback, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";


interface Props {
    currentPage: number;
    totalPages: number; 
}

// Custom Hook con la lógica de la paginación en la aplicación.
export function usePagination({ currentPage, totalPages }: Props) {
    // Recuperación del path y los searchParams de la ruta.
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Creación del arreglo de páginas
    const allPages = useMemo(
        () => {
            if (totalPages <= 7) {
                return Array.from({ length: totalPages }, (_, i) => i + 1);
            }

            if (currentPage <= 3) {
                return [1, 2, 3, "...", totalPages - 1, totalPages];
            } 
            
            if (currentPage >= totalPages - 2) {
                return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
            }

            return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
        },
        [currentPage, totalPages]
    );

    // Creación de la URL de navegación entre páginas
    const createPageURL = useCallback((page: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());

        return `${pathname}?${params.toString()}`;
    }, []);

    return {
        allPages,
        createPageURL,
    }
}