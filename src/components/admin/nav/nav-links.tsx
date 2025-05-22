import Link from "next/link";
import clsx from "clsx";
import type { FC } from "react";

// Interfaz para las propiedades del componente LinkComponent
interface Props {
    href: string;
    children?: React.ReactNode;
    isActive: boolean;
}

// Componente de enlace de navegación con estilos para estado activo.
export const LinkComponent: FC<Props> = ({ href, children, isActive }) => {
    return (
        <Link 
            href={ href }
            className={clsx(
                "flex items-center gap-3 py-2 px-4 rounded-md hover:bg-blue-100 hover:text-blue-500 transition-colors", 
                { 
                    "text-blue-500 bg-blue-100 hover:bg-blue-200 hover:text-blue-600": isActive,
                    "bg-gray-50" : !isActive
                }
            )}
        >
            { children }
        </Link>  
    )
}