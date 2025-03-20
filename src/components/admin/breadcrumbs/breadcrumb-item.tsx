import Link from "next/link";
import type { FC } from "react";
import { MdChevronRight } from "react-icons/md";
import type { Breadcrumb } from "@/utils/navigation";

interface Props {
    /** Objeto que contiene la información del breadcrumb (label y href) */
    breadcrumb: Breadcrumb;
    /** Indica si es el último elemento en la lista de breadcrumbs */
    isLast: boolean;
    /** Posición actual del elemento en la lista */
    index: number;
    /** Número total de elementos en la lista de breadcrumbs */
    totalItems: number;
};

/**
 * Componente que representa un elemento individual en la lista de migas de pan.
 * 
 * Características:
 * - Renderiza diferente según si es el último elemento o no
 * - El último elemento se muestra como texto sin enlace
 * - Los elementos intermedios son enlaces navegables
 * - Incluye separadores (chevron) entre elementos
 * - Implementa características de accesibilidad (ARIA roles y estados)
 * - Estilos interactivos en hover para los enlaces
 */
export const BreadcrumbItem: FC<Props> = ({ breadcrumb, isLast, index, totalItems }) => {
    // Renderizar el último elemento como texto
    if (isLast) {
        return (
            <span 
                role="link"
                aria-disabled="true"
                aria-current="page"
                className="font-normal text-foreground text-lg"
            >
                {breadcrumb.label}
            </span>
        );
    }

    // Renderizar el elemento como enlace
    return (
        <div className="inline-flex items-center gap-1.5">
            <li className="inline-flex items-center gap-1.5">
                <Link 
                    href={breadcrumb.href} 
                    className="text-lg text-neutral-500 hover:text-blue-500 transition-colors"
                >
                    {breadcrumb.label}
                </Link>
            </li>

            {totalItems - 2 >= index && (
                <li role="presentation" aria-hidden="true" className="text-neutral-500">
                    <MdChevronRight size={20} />
                </li>
            )}
        </div>
    );
};