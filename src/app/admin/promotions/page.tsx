import { Suspense } from "react";
import { InputSearch } from "@/components/global/InputSearch";
import { SelectLimit } from "@/components/global/SelectLimit";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PromotionsTable } from "@/components/admin/promotions/promotions-table";
import { CreatePromotionForm } from "@/components/admin/promotions/create-form";

export default function PromotionsPage() {
    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16">
            <div>
                <h1 className="text-2xl lg:text-2xl font-semibold text-neutral-500">
                    Listado de Usuarios
                </h1>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                    ]} 
                    final="Promociones"
                />
            </div>

            <div className="space-y-5 md:p-5 md:shadow-md bg-white md:rounded-md">
                <div className="flex flex-col md:flex-row gap-3">
                    <InputSearch placeholder="Buscar promociones"/>
                    <SelectLimit label="promocióne" />
                    <CreatePromotionForm/>
                </div>

                <Suspense fallback={<p>Cargando...</p>}>
                    <PromotionsTable/>
                </Suspense>
            </div>
        </section>
    )
}
