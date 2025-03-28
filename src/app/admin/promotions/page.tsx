import { Suspense } from "react";
import { TitlePage } from "@/components/admin/title-page";
import { BreadcrumbsPage } from "@/components/admin/breadcrumbs-page";
import { ToolsSectionPage } from "@/components/admin/tools-section-page";
import { PromotionsTable } from "@/components/admin/promotions/promotions-table";

export default function PromotionsPage() {
    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16">
            <div>
                <TitlePage title="Listado de Promociones"/>

                <BreadcrumbsPage 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                    ]} 
                    final="Promociones"
                />
            </div>

            <ToolsSectionPage 
                placeholder="Buscar promoción"
                destiny="/admin/promotions/create"
                label="Nueva Promoción"
            />
            
            <Suspense fallback={<p>Cargando...</p>}>
                <PromotionsTable/>
            </Suspense>
        </section>
    )
}
