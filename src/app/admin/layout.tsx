import { NavBar } from "@/src/components/admin/nav-bar";
import { SideBar } from "@/src/components/admin/side-bar";
import type { ILayout } from "@/src/types/components";

export default function AdminLayout({ children }: ILayout) {
    return (
        <>
            <NavBar />
            
            <main className="flex h-[calc(100vh-64px)] bg-green-500">
                <SideBar />
                {children}
            </main>
        </>
    )
}
