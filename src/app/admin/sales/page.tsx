import { Suspense } from "react";
// import { TitlePage } from "@/components/admin/title-page";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
// import { ToolsSectionPage } from "@/components/admin/tools-section-page";
import { SalesTable } from "@/components/admin/sales/sales-table";
// import { SaleFilters } from "@/components/admin/sales/sales-filters";c

export default async function SalesPage() {
    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16">
            <div>
                {/* <TitlePage title="Listado de Ventas"/> */}

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                    ]} 
                    final="Ventas"
                />
            </div>

            {/* <ToolsSectionPage placeholder="Buscar ventas">
                <Suspense fallback={<p>Cargando...</p>}>
                    <SaleFilters />
                </Suspense>
            </ToolsSectionPage> */}
            
            <Suspense fallback={<p>Cargando...</p>}>
                <SalesTable/>
            </Suspense>
        </section>
    )
}
