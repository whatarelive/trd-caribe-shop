import { LayoutDashboard } from "lucide-react";
import { NavList } from "@/components/admin/nav/nav-list";
import { ButtonLogout } from "@/components/global/ButtonLogout";


// Barra lateral de navegación.
export const SideBar = () => {
    return (
        <section className="hidden sticky top-0 h-screen xl:flex xl:flex-col xl:gap-2 p-4 min-w-64">
            <div className="p-1 bg-white rounded-md shadow-md">
                <div className="flex flex-col px-4 py-8 items-center justify-center rounded-sm bg-blue-600">
                    <div className="flex gap-3 py-1 border-b border-white">
                        <LayoutDashboard size={30} className="text-white"/>

                        <h1 className="text-2xl text-white font-medium">
                            TRD CARIBE
                        </h1>
                    </div>

                    <p className="mt-1 text-white text-sm font-medium">
                        Panel de Administración
                    </p>
                </div>
            </div>

            <NavList />

            <div className="relative bg-gray-50 h-full rounded-md shadow-md"/>

            <ButtonLogout />
        </section>
    )
}