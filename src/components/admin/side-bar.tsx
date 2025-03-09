"use client";

import { usePathname } from "next/navigation";
import { IoHomeOutline, IoGridOutline, IoPeopleOutline, IoCardOutline, IoCartOutline } from "react-icons/io5";
import { LinkComponent } from "@/src/components/admin/nav-links";

export const SideBar = () => {
    const pathname = usePathname();

    return (
        <section className="hidden lg:block w-64 h-[calc(100vh-64px)] border-r border-gray-200 bg-white">
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
        </section>
    )
}
