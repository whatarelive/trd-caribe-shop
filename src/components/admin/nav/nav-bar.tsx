import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { NavMenu } from "@/src/components/admin/nav/nav-menu";
import { BreadcrumbsList } from "@/src/components/admin/breadcrumbs/breadcrumbs-list";
import { ButtonLogout, ButtonOpenSidebar } from "@/src/components/ui/buttons";

/**
 * Barra de navegación superior del panel de administración.
 * 
 * Características:
 * - Muestra el título del dashboard con un ícono
 * - Incluye un botón para abrir/cerrar la barra lateral en dispositivos móviles
 * - Muestra una lista de breadcrumbs para la navegación
 * - Proporciona accesos rápidos a configuración y cierre de sesión
 * - Se adapta a diferentes tamaños de pantalla (responsive)
 */
export const NavBar = () => {
    return (
        <header className="flex justify-between items-center px-6 w-full h-16 border-b border-neutral-200">
            {/* Contenedor principal */}
            <div className="flex items-center gap-4">
                {/* Contenedor de icono y título */}
                <div className="inline-flex items-center gap-2 lg:px-4 lg:pr-14 lg:border-r lg:border-neutral-200">
                    <MdSpaceDashboard size={24} className="hidden lg:block" />
                    
                    <ButtonOpenSidebar />
                    
                    <h1 className="text-xl md:text-2xl font-medium">
                        Dashboard
                    </h1>
                </div>

                {/* Lista de breadcrumbs */}
                <BreadcrumbsList />
            </div>

            {/* Contenedor de accesos rápidos */}
            <div className="hidden lg:inline-flex items-center gap-2">
                <Link href="/admin/account" className="p-2 rounded-lg bg-neutral-50 border border-neutral-300 cursor-pointer hover:bg-neutral-100 transition-colors">
                    <IoSettingsOutline size={24} className="text-neutral-400"/>
                </Link>

                <ButtonLogout />
            </div>

            {/* Botón de menú en dispositivos móviles */}
            <div className="lg:hidden">
                <NavMenu />
            </div>
        </header>
    )
}
