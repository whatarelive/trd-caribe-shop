import { Suspense } from "react";
import { TitlePage } from "@/components/admin/title-page";
import { BreadcrumbsPage } from "@/components/admin/breadcrumbs-page";
import { ToolsSectionPage } from "@/components/admin/tools-section-page";
import { SalesTable } from "@/components/admin/sales/sales-table";
import { SaleStateFilters } from "@/components/admin/sales/modal-state-filters";

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SalesPage({ searchParams }: Props) {
    const { 
        // page, 
        status 
    } = await searchParams;

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

            <ToolsSectionPage placeholder="Buscar ventas"/>

            <SaleStateFilters filters={status}/>
            
            <Suspense fallback={<p>Cargando...</p>}>
                <SalesTable/>
            </Suspense>
        </section>
    )
}
