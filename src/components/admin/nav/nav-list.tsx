"use client";

import { usePathname } from "next/navigation";
import { IoCardOutline, IoCartOutline, IoGridOutline, IoHomeOutline, IoPeopleOutline } from "react-icons/io5";
import { LinkComponent } from '@/src/components/admin/nav/nav-links';

/**
 * Este componente renderiza una barra de navegación vertical con enlaces a las diferentes
 * secciones del panel de administración. Incluye iconos y etiquetas para cada enlace,
 * y resalta visualmente la sección activa basándose en la ruta actual.
 * 
 * Secciones disponibles:
 * - Inicio: Panel principal de administración
 * - Productos: Gestión de productos
 * - Promociones: Gestión de promociones y ofertas
 * - Usuarios: Administración de usuarios
 * - Ventas: Registro y gestión de ventas
 */
export const NavList = () => {
    const pathname = usePathname();

    return (
        <nav className="p-6">
            <ul className="flex flex-col gap-4">
                <LinkComponent href="/admin" label="Inicio" isActive={pathname === "/admin"}>
                    <IoHomeOutline size={24} />
                </LinkComponent>
                
                <LinkComponent href="/admin/products" label="Productos" isActive={pathname.includes("/admin/products")}>
                    <IoGridOutline size={24} />
                </LinkComponent>      

                <LinkComponent href="/admin/promotions" label="Promociones" isActive={pathname.includes("/admin/promotions")}>
                    <IoCardOutline size={24} />
                </LinkComponent>

                <LinkComponent href="/admin/users" label="Usuarios" isActive={pathname.includes("/admin/users")}>
                    <IoPeopleOutline size={24} />                        
                </LinkComponent>

                <LinkComponent href="/admin/sales" label="Ventas" isActive={pathname.includes("/admin/sales")}>
                    <IoCartOutline size={24} />                        
                </LinkComponent>
            </ul>
        </nav>
    )
}
