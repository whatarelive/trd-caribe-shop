import { Suspense } from "react";
import { InputSearch } from "@/components/global/InputSearch";
import { SelectLimit } from "@/components/global/SelectLimit";
import { SelectOrderBy } from "@/components/global/SelectOrderBy";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PromotionsTable } from "@/components/admin/promotions/promotions-table";
import { CreatePromotionForm } from "@/components/admin/promotions/create-form";
import { PromotionsSkeleton } from "@/components/admin/promotions/promotions-skeleton";
import type { IPage } from "@/interfaces/components";

const filters = [
    { label: "Precio Minimo", value: "min_price" },
    { label: "Precio Máximo", value: "max_price" },
]

export default async function PromotionsPage({ searchParams }: IPage) {
    const { page = "1", limit = "8", search = "", ordering } = await searchParams;

    const currentPage = Number(page);
    const currentLimit = Number(limit);

    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16 bg-white lg:bg-transparent">
            <div>
                <h1 className="title-page">Listado de Promociones</h1>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                    ]} 
                    final="Promociones"
                />
            </div>

            <div className="space-y-5 lg:shadow-md bg-white lg:rounded-md lg:p-5">
                <div className="flex flex-col md:flex-row gap-3">
                    <InputSearch placeholder="Buscar promociones por precio"/>
                    <SelectOrderBy filters={filters}/>
                    <SelectLimit label="promocióne" />
                    <CreatePromotionForm/>
                </div>

                <Suspense 
                    key={search + currentPage + limit + ordering} 
                    fallback={<PromotionsSkeleton rows={currentLimit}/>}
                >
                    <PromotionsTable 
                        limit={currentLimit} 
                        page={currentPage} 
                        search={search}
                        ordering={ordering} 
                    />
                </Suspense>
            </div>
        </section>
    )
}
