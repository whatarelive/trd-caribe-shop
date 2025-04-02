import { Suspense } from "react";
import { TitlePage } from "@/components/admin/title-page";
import { BreadcrumbsPage } from "@/components/admin/breadcrumbs-page";
import { ToolsSectionPage } from "@/components/admin/tools-section-page";
import { SalesTable } from "@/components/admin/sales/sales-table";
import { SaleFilters } from "@/components/admin/sales/sales-filters";

export default async function SalesPage() {
    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16">
            <div>
                <TitlePage title="Listado de Ventas"/>

                <BreadcrumbsPage 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                    ]} 
                    final="Ventas"
                />
            </div>

            <ToolsSectionPage placeholder="Buscar ventas">
                <SaleFilters />
            </ToolsSectionPage>
            
            <Suspense fallback={<p>Cargando...</p>}>
                <SalesTable/>
            </Suspense>
        </section>
    )
}
