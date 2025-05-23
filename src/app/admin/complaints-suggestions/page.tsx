import { Suspense } from "react";
import { TitlePage } from "@/components/admin/title-page";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ToolsSectionPage } from "@/components/admin/tools-section-page";
import { ComplaintsAndSuggestionsTable } from "@/components/admin/complaints-suggestions/complaints-table";

export default function ComplaintsAndSuggestionsPage() {
    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16">
            <div>
                <TitlePage title="Listado de Comentarios"/>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                    ]} 
                    final="Comentarios"
                />
            </div>

            <ToolsSectionPage placeholder="Buscar comentario" />
            
            <Suspense fallback={<p>Cargando...</p>}>
                <ComplaintsAndSuggestionsTable />   
            </Suspense>
        </section>
    )
}
