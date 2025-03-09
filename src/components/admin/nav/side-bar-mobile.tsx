"use client";

import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";
import { useMenuStore } from "@/src/store/menu-store";
import { NavList } from "@/src/components/admin/nav/nav-list";

/**
 * Barra lateral de navegación para dispositivos móviles que se muestra/oculta mediante un estado global.
 * 
 * Este componente implementa una barra lateral responsiva que:
 * - Se oculta en dispositivos desktop (lg:hidden)
 * - Tiene una animación de deslizamiento al mostrarse/ocultarse
 * - Incluye un botón para cerrar la barra
 * - Muestra una lista de navegación usando el componente NavList
 */
export const SideBarMobile = () => {
    // Estado global para controlar la visibilidad del menú
    const { isOpen, setIsOpen } = useMenuStore();

    return (
        <section className={clsx(
            "lg:hidden flex flex-col absolute z-50 w-64 h-screen border-r border-gray-200 bg-white transition-transform duration-300",
            {
                "-translate-x-full": !isOpen,
                "translate-x-0": isOpen
            }
        )}>
            {/* Contenedor de encabezado */}
            <div className="flex justify-between items-center p-[18px] border-b border-gray-200">
                <h1 className="text-xl font-medium">
                    Menu
                </h1>

                <button onClick={() => setIsOpen(false)}>
                    <IoCloseOutline size={24} />
                </button>
            </div>

            {/* Lista de navegación */}
            <NavList />
        </section>
    )
}