import { TitlePage } from "@/components/admin/title-page";
import { BreadcrumbsPage } from "@/components/admin/breadcrumbs-page";
import { CreatePromotionForm } from "@/components/admin/promotions/create-form";

export default function PromotionCreatePage() {
    return (
        <section className="flex flex-col w-full gap-6 p-4 min-[375px]:p-8 xl:pr-16">
            {/* Sección del formulario con fondo blanco y bordes redondeados */}
            <div>
                <TitlePage title="Creación de Promociones"/>

                <BreadcrumbsPage 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                        { label: "Promociones", destiny: "/admin/promotions" },
                    ]} 
                    final="Crear Promoción"
                />
            </div>

            {/* Formulario de creación de promociónes */}
            <CreatePromotionForm/>
        </section>
    )
}
