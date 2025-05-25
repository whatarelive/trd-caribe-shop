'use client'

import clsx from "clsx";
import { useState } from "react";
import { ChevronRight, LayoutDashboard } from "lucide-react";
import { NavList } from "@/components/admin/nav/nav-list";
import { ButtonLogout } from "@/components/admin/nav/button-logout";


// Barra lateral de navegación para dispositivos móviles que se muestra/oculta mediante un estado global.
export const SideBarMobile = () => {
    // Estado global para controlar la visibilidad del menú
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className={clsx(
            "fixed xl:hidden flex flex-col w-64 pb-3 min-h-screen bg-gray-50 z-50 transition-transform duration-300",
            {
                "-translate-x-full": !isOpen,
                "translate-x-0 shadow-lg": isOpen
            },
        )}>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={clsx(
                    "absolute top-14 rounded-full p-1 cursor-pointer transition-all duration-300",
                    {
                        "rotate-180 -right-4 bg-white text-blue-500 shadow-lg": isOpen,
                        "-right-6 bg-blue-500 text-white" : !isOpen
                    },
                )}
            >
                <ChevronRight size={24} />
            </button>

            <div className="flex flex-col px-4 py-8 items-center justify-center bg-blue-600">
                <div className="flex gap-3 py-1 border-b border-white">
                    <LayoutDashboard size={30} className="text-white"/>

                    <h1 className="text-2xl text-white font-medium">
                        TRD CARIBE
                    </h1>
                </div>

                <p className="mt-1 text-white font-medium">
                    Panel de Administración
                </p>
            </div>
            
            <div className="relative flex flex-col grow p-4">
                <h3 className="text-lg text-center mb-3">
                    Menú de Navegación
                </h3>

                <NavList />
            </div>

            <ButtonLogout/>
        </section>
    )
}