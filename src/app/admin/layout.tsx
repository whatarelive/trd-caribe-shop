import { SideBar } from '@/components/admin/nav/side-bar';
import { SideBarMobile } from '@/components/admin/nav/side-bar-mobile';
import type { ILayout } from "@/interfaces/components";

/**
 * Componente de diseño principal para la sección de administración.
 * Proporciona una estructura consistente con una barra lateral y un 
 * área principal de contenido.
 *
 * Incluye:
 * - Barra lateral desplegable para moviles
 * - Barra estatica en escritorio
 * - Área principal para contenido dinámico
 */
export default function AdminLayout({ children }: ILayout) {
    return (
        <main className="relative flex w-full min-h-screen xl:gap-8 bg-white">
            {/* Barra lateral mobile */}
            <SideBarMobile />
            
            {/* Barra lateral desktop */}
            <SideBar/>

            {/* Contenido dinámico */}
            { children }
        </main>
    )
}
