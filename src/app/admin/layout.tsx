import { SideBar } from '@/components/admin/nav/side-bar';
import { SideBarMobile } from '@/components/admin/nav/side-bar-mobile';
import type { ILayout } from "@/interfaces/components";


// Componente de diseño principal para la sección de administración.
export default function AdminLayout({ children }: ILayout) {
    return (
        <main className="relative flex w-full min-h-screen xl:gap-8 bg-gray-100">
            {/* Barra lateral mobile */}
            <SideBarMobile />
            
            {/* Barra lateral desktop */}
            <SideBar/>

            {/* Contenido dinámico */}
            { children }
        </main>
    )
}
