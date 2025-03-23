"use client";

import clsx from "clsx";
import { NavList } from "@/components/admin/nav/nav-list";
import { MdArrowForwardIos } from "react-icons/md";
import { useMenuStore } from "@/store/menu-store";

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
            "absolute xl:hidden flex flex-col w-64 h-full bg-gray-50 z-50 transition-transform duration-300",
            {
                "-translate-x-full": !isOpen,
                "translate-x-0": isOpen
            },
        )}>

            {/* Contenedor de encabezado */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={clsx(
                    "absolute top-24 bg-blue-400 rounded-full p-2 cursor-pointer transition-all duration-300",
                    {
                        "rotate-180 -right-4": isOpen,
                        "-right-6" : !isOpen
                    },
                )}
            >
                <MdArrowForwardIos size={18} className="text-white" />
            </button>

            <div className="flex relative justify-between items-center p-[18px] border-b border-gray-200">
                <h1 className="text-xl font-medium">
                    Dashboard
                </h1>
            </div>

            {/* Lista de navegación */}
            <NavList />
        </section>
    )
}