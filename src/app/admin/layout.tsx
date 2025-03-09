import { NavBar } from "@/src/components/admin/nav/nav-bar";
import { NavList } from "@/src/components/admin/nav/nav-list";
import { SideBarMobile } from "@/src/components/admin/nav/side-bar-mobile";
import type { ILayout } from "@/src/types/components";

/**
 * Componente de diseño principal para la sección de administración.
 * Proporciona una estructura consistente con una barra de navegación superior,
 * una barra lateral y un área principal de contenido.
 *
 * Incluye:
 * - Barra lateral móvil para dispositivos pequeños
 * - Barra de navegación superior
 * - Barra lateral fija para pantallas grandes
 * - Área principal para contenido dinámico
 */
export default function AdminLayout({ children }: ILayout) {
    return (
        <>
            {/* Barra lateral móvil */}
            <SideBarMobile />
            
            {/* Barra de navegación superior */}
            <NavBar />

            {/* Área principal */}
            <main className="flex h-[calc(100vh-64px)] bg-green-500">
                {/* Barra lateral fija */}
                <section className="hidden lg:block w-64 h-[calc(100vh-64px)] border-r border-gray-200 bg-white">
                    <NavList />
                </section>

                {/* Contenido dinámico */}
                {children}
            </main>
        </>
    )
}
