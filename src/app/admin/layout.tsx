import { NavBar } from "@/components/admin/nav/nav-bar";
import { NavList } from "@/components/admin/nav/nav-list";
import { SideBarMobile } from "@/components/admin/nav/side-bar-mobile";
import type { ILayout } from "@/interfaces/components";

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
            <main className="relative flex top-16 bg-white">
                {/* Barra lateral fija */}
                <section className="hidden z-20 lg:block fixed w-64 border-r lg:h-[calc(100vh-64px)] border-gray-200">
                    <NavList />
                </section>

                {/* Contenido dinámico */}
                <section className="relative w-full lg:left-64 lg:w-[calc(100vw-274px)] lg:h-[calc(100vh-72px)]">
                    {children}
                </section>
            </main>
        </>
    )
}
