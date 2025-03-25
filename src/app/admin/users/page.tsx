import { Suspense } from "react";
import { TitlePage } from "@/components/admin/title-page";
import { BreadcrumbsPage } from "@/components/admin/breadcrumbs-page";
import { ToolsSectionPage } from "@/components/admin/tools-section-page";
import { UsersTable } from "@/components/admin/users/users-table";

export default function UsersPage() {
    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16">
            <div>
                <TitlePage title="Listado de Usuarios"/>

                <BreadcrumbsPage 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                    ]} 
                    final="Usuarios"
                />
            </div>

            <ToolsSectionPage 
                placeholder="Buscar usuarios" 
                destiny="/admin/users/create" 
                label="Nuevo Usuario"
            />
            
            <Suspense fallback={<p>Cargando...</p>}>
                <UsersTable />   
            </Suspense>
        </section>
    )
}
