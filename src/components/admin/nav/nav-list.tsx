'use client'

import { usePathname } from "next/navigation";
import { CreditCard, House, MessageSquareText, Package, ShoppingCart, Users } from "lucide-react";
import { LinkComponent } from "@/components/admin/nav/nav-links";

// Renderiza una barra de navegación vertical con enlaces a las diferentes secciones 
export const NavList = () => {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col w-full max-w-64 gap-2">
            <LinkComponent href="/admin" isActive={pathname === "/admin"}>
                <House size={24} />
                Inicio
            </LinkComponent>
            <LinkComponent href="/admin/products?page=1" isActive={pathname.includes("/admin/products")}>
                <Package size={24} />
                Productos
            </LinkComponent>      
            <LinkComponent href="/admin/promotions?page=1" isActive={pathname.includes("/admin/promotions")}>
                <CreditCard size={24} />
                Promociones
            </LinkComponent>
            <LinkComponent href="/admin/comments?page=1" isActive={pathname.includes("/admin/comments")}>
                <MessageSquareText size={24}/>
                Comentarios
            </LinkComponent>
            <LinkComponent href="/admin/users?page=1" isActive={pathname.includes("/admin/users")}>
                <Users size={24} />           
                Usuarios             
            </LinkComponent>
            <LinkComponent href="/admin/sales?page=1" isActive={pathname.includes("/admin/sales")}>
                <ShoppingCart size={24} />    
                Ventas                    
            </LinkComponent>
        </nav>
    )
}
