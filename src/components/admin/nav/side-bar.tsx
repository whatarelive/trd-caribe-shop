import { MdSpaceDashboard, MdLogout } from "react-icons/md";
import { logout } from "@/actions/auth/logout";
import { NavList } from "@/components/admin/nav/nav-list";

/**
 * Barra lateral de navegación.
 * 
 * Este componente implementa una barra lateral responsiva que:
 * - Se muestra en dispositivos desktop
 * - Muestra una lista de navegación usando el componente NavList
 */
export const SideBar = () => {
    return (
        <section className="hidden xl:flex xl:flex-col xl:gap-2 p-4">
            {/* Contenedor de encabezado */}
            <div className="flex flex-col px-4 py-8 items-center justify-center rounded-md bg-blue-600">
                <div className="flex gap-3 py-1 border-b border-white">
                    <MdSpaceDashboard size={30} className="text-white"/>

                    <h1 className="text-2xl text-white font-medium">
                        TRD CARIBE
                    </h1>
                </div>

                <p className="mt-1 text-white font-medium">
                    Panel de Administración
                </p>
            </div>

            {/* Lista de navegación */}
            <NavList />

            <div className="bg-gray-50 h-full rounded-md"/>

            <form action={logout}>
                <button
                    type="submit" 
                    className="flex w-full items-center gap-3 py-2 px-4 rounded-md cursor-pointer bg-gray-50 hover:bg-red-100 hover:text-red-500 transition-colors"
                >
                    <MdLogout size={24}/>
                    Cerrar Sesión
                </button>
            </form>
        </section>
    )
}