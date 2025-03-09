"use client"

import Link from "next/link";
import { useState } from "react";
import { IoEllipsisVertical, IoSettingsOutline } from "react-icons/io5";
import { ButtonLogout } from "@/src/components/ui/buttons";

/**
 * Menú de navegación desplegable para dispositivos móviles.
 * 
 * Características:
 * - Botón de menú con ícono de tres puntos verticales
 * - Menú desplegable con animación y diseño tipo popover
 * - Opciones de navegación:
 *   - Acceso a configuración de cuenta
 *   - Botón de cierre de sesión
 * - Estado local para controlar la visibilidad del menú
 * - Diseño responsivo con sombras y efectos visuales
 */
export const NavMenu = () => {
    // Estado local para controlar la visibilidad del menú
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            {/* Botón de menú */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg bg-neutral-50 cursor-pointer hover:bg-neutral-100 transition-colors"
            >
                <IoEllipsisVertical size={24} />
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <div className="absolute right-0 top-12 bg-neutral-100 shadow-lg shadow-black/50 rounded-md p-4">
                    {/* Triángulo de sombra */}
                    <div className={`absolute z-0 -top-5 right-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-neutral-100 
                        border-l-transparent border-r-transparent`}/>

                    {/* Lista de opciones */}
                    <ul className="relative flex flex-col z-40 gap-4">
                        <li className="flex min-w-20 items-center gap-2">
                            <Link href="/admin/account" className="flex items-center gap-2">
                                <IoSettingsOutline size={24}/>
                                
                                <span>Configuración</span>
                            </Link>
                        </li>

                        <li>
                            <ButtonLogout />
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}
