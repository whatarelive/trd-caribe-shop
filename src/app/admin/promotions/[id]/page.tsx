import { TitlePage } from "@/components/admin/title-page";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EditPromotionForm } from "@/components/admin/promotions/edit-form";
import { promotions } from "@/lib/data/promotions";

export default function EditPromotionPage() {
    return (
        <section className="flex flex-col w-full gap-6 p-4 min-[375px]:p-8 xl:pr-16">
            {/* Sección del formulario con fondo blanco y bordes redondeados */}
            <div>
                <TitlePage title="Editar Promoción"/>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                        { label: "Promociones", destiny: "/admin/promotions" },
                    ]} 
                    final="Editar Promoción"
                />
            </div>

            {/* Formulario de edición de promociones */}
            <EditPromotionForm promotion={promotions[1]}/>
            
        </section>
    )
}
