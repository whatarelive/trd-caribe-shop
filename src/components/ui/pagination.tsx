'use client'

import Link from "next/link";
import clsx from "clsx";
import { memo, type FC } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePagination } from "@/lib/hooks/usePagination";
import type { NumberProps, ArrowProps, PaginationProps } from "@/interfaces/components";


// Componente para navegación a una página especifica.
const PaginationNumber: FC<NumberProps> = memo(({ page, href, isActive, position }) => {
    // Estilos condicionales del componente.
    const className = clsx(
        "flex h-10 w-10 items-center justify-center text-sm border",
        {
            "z-10 bg-blue-600 border-blue-600 text-white": isActive,
            "hover:bg-gray-100 border-gray-300 text-gray-600": !isActive,
            "rounded-s-md": position === "start",
            "rounded-e-md": position === "end"
        }
    );

    return isActive || page === "..." ? (
        <span className={className}>
            {page}
        </span>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    );
})

// Componente para la navegación hacia atras o al siguiente.
const PaginationArrow: FC<ArrowProps> = memo(({ href, direction, isDisabled }) => {
    // Estilos condicionales del componente.
    const className = clsx(
        "flex gap-2 px-2 h-10 min-w-10 items-center justify-center rounded-md border",
        {
            "pointer-events-none text-gray-300 text-gray-100 border-gray-100": isDisabled,
            "hover:bg-gray-50 border-gray-300 text-gray-600": !isDisabled,
            "mr-2 md:mr-4": direction === 'left',
            "flex-row-reverse ml-2 md:ml-4": direction === 'right',
        }
    );

    const Icon = direction === 'left' ? ArrowLeft : ArrowRight;
    const label = direction === 'left' ? "Anterior" : "Siguiente";

    return isDisabled ? (
        <div className={className}>
            <Icon size={18} />
            <span>{ label }</span>
        </div>
    ) : (
        <Link href={href} className={className}>
            <Icon size={18} />
            <span>{ label }</span>
        </Link>
    );
})

// Componente Principal para la paginación.
export const Pagination: FC<PaginationProps> = memo(({ currentPage, count, limit, className }) => {
    // Se calcula la cantidad de páginas necesarias.
    const calcPages = Math.round(count / limit);
    // Se comprueba que la cantidad de páginas no sea menor que 1.
    const totalPages = calcPages > 1 ? calcPages : 1;
    // Custom Hook para manejar la lógica de páginación.
    const { allPages, createPageURL } = usePagination({ currentPage, totalPages });

    return (
        <section className="flex w-full justify-center items-center">
            <PaginationArrow
                direction="left"
                href={createPageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
            />

            <div className={cn("flex -space-x-px", className)}>
                {allPages.map((page, index) => (
                    <PaginationNumber
                        key={index}
                        page={page}
                        href={createPageURL(page)}
                        isActive={currentPage === page}
                        position={index === 0 ? "start" : page === totalPages ? "end" : null}
                    />
                ))}
            </div>

            <PaginationArrow
                direction="right"
                href={createPageURL(currentPage + 1)}
                isDisabled={currentPage >= totalPages}
            />
        </section>
    );
})