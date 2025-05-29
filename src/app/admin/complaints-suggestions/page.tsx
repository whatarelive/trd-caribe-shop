import { Suspense } from "react";
import { SelectLimit } from "@/components/global/SelectLimit";
import { SelectOrderBy } from "@/components/global/SelectOrderBy";
import { InputSearch } from "@/components/global/InputSearch";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ComplaintsTable } from "@/components/admin/complaints-suggestions/complaints-table";
import { ComplaintsSkeleton } from "@/components/admin/complaints-suggestions/complaints-skeleton";
import type { IPage } from "@/interfaces/components";

// Listado de filtros para ordenar las quejas y sugerencias
const filters = [
    { label: "Usuario", value: "user" },
    { label: "Estado", value: "active" }, 
    { label: "Fecha de creación", value: "created" },
    { label: "Fecha de respuesta", value: "upate" } 
];

export default async function ComplaintsPage({ searchParams }: IPage) {
    const { page = "1", limit = "8", search = "", ordering } = await searchParams;

    const currentPage = Number(page);
    const currentLimit = Number(limit);

    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16 bg-white md:bg-transparent">
            <div>
                <h1 className="title-page">Listado de Comentarios</h1>
                
                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                    ]} 
                    final="Comentarios"
                />
            </div>

            <div className="space-y-5 md:p-5 md:shadow-md bg-white md:rounded-md">
                <div className="flex flex-col md:flex-row gap-3">
                    <InputSearch placeholder="Buscar comentarios"/>
                    <SelectOrderBy filters={filters}/>
                    <SelectLimit label="comentario" />
                </div>

                <Suspense 
                    key={search + currentPage + currentLimit + ordering} 
                    fallback={<ComplaintsSkeleton rows={8}/>}
                >
                    <ComplaintsTable 
                        page={currentPage} limit={currentLimit} 
                        ordering={ordering} search={search} 
                    />   
                </Suspense>
            </div>
        </section>
    )
}
