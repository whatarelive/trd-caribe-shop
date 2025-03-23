import clsx from "clsx";
import Link from "next/link";

// Interfaz para las propiedades del componente LinkComponent
interface Props {
    /** URL de destino del enlace */
    href: string;
    /** Texto que se mostrará en el enlace */
    label: string;
    /** Elementos hijos opcionales que se renderizarán antes de la etiqueta (normalmente iconos) */
    children?: React.ReactNode;
    /** Indica si el enlace está actualmente activo */
    isActive: boolean;
}

/**
 * Componente de enlace de navegación con estilos para estado activo.
 * Utilizado para crear elementos de navegación con indicador visual de la página actual.
 * 
 * Características:
 * - Soporta iconos o elementos personalizados antes del texto
 * - Incluye estados hover y active con transiciones suaves
 */
export const LinkComponent: React.FC<Props> = ({ href, label, children, isActive }) => {
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
            <span>{ label }</span>
        </Link>  
    )
}