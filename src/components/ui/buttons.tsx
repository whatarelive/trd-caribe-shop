"use client"

import { IoMenu, IoReturnDownForwardOutline } from "react-icons/io5";
import { logoutUser } from "@/src/lib/actions/auth"
import { useMenuStore } from "@/src/store/menu-store";

/**
 * Botón de cierre de sesión con diseño adaptativo.
 * 
 * Características:
 * - Ejecuta la acción de cierre de sesión del usuario
 * - Diseño responsivo con estilos específicos para móvil y desktop
 * - Incluye ícono y texto descriptivo
 * - Efectos visuales en hover
 */
export const ButtonLogout = () => {
    // Función para cerrar sesión
    const handleClick = async () => await logoutUser();

    return (
        <button 
            onClick={handleClick}
            className={`flex flex-row-reverse items-center gap-2 lg:p-2 rounded-lg lg:bg-neutral-50 lg:border 
            lg:border-neutral-300 lg:text-neutral-400 cursor-pointer hover:bg-neutral-100 transition-colors`} 
        >
            <span>Cerrar sesión</span>
            <IoReturnDownForwardOutline size={24}/>
        </button>
    )
}

/**
 * Botón para controlar la visibilidad del menú lateral en dispositivos móviles.
 * 
 * Características:
 * - Utiliza el estado global de menú mediante useMenuStore
 * - Solo visible en pantallas móviles (oculto en desktop)
 * - Incluye ícono de hamburguesa
 * - Efectos visuales en hover
 */
export const ButtonOpenSidebar = () => {
    // Estado global para controlar la visibilidad del menú
    const { isOpen, setIsOpen } = useMenuStore();

    return (
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden inline-flex items-center justify-center p-2 rounded-lg bg-neutral-50 cursor-pointer 
            hover:bg-neutral-100 transition-colors`}
        >
            <IoMenu size={28}/>
        </button>
    )
}
