import { Suspense } from "react";
import { SelectLimit } from "@/components/global/SelectLimit";
import { SalesTable } from "@/components/admin/sales/sales-table";
import { SalesTableSkeleton } from "@/components/admin/sales/sales-skeleton";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { IPage } from "@/interfaces/components";


export default async function SalesPage({ searchParams }: IPage) {
    const { page = "1", limit = "8", search = "" } = await searchParams;

    const currentPage = Number(page);
    const currentLimit = Number(limit);

    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16 bg-white lg:bg-transparent">
            <div>
                <h1 className="title-page">Listado de Usuarios</h1>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                    ]} 
                    final="Ventas"
                />
            </div>

            <div className="space-y-5 bg-white lg:shadow-md lg:rounded-md lg:p-5">
                <div className="flex flex-col md:flex-row gap-3">
                    <SelectLimit label="venta" />
                </div>

                <Suspense 
                    key={search + page + limit} 
                    fallback={<SalesTableSkeleton rows={currentLimit}/>}
                >
                    <SalesTable page={currentPage} limit={currentLimit} search={search}/>
                </Suspense>
            </div>
        </section>
    )
}
