import { TitlePage } from "@/components/admin/title-page";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ComplaintsDetail } from "@/components/admin/complaints-suggestions/complaints-detail";

export default function ComplaintsAndSuggestionsInfoPage() {
    return (
        <section className="flex flex-col w-full gap-6 p-4 min-[375px]:p-8 xl:pr-16">
            {/* Sección del formulario con fondo blanco y bordes redondeados */}
            <div>
                <TitlePage title="Detalles del Comentario"/>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                        { label: "Comentarios", destiny: "/admin/complaints-suggestions" },
                    ]} 
                    final="Detalles"
                />
            </div>

            {/* View con la imformación del comentario */}
            <ComplaintsDetail/>
        </section>
    )
}
