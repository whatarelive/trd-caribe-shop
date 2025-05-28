import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { InputSearch } from "@/components/global/InputSearch";
import { SelectLimit } from "@/components/global/SelectLimit";
import { UsersTable } from "@/components/admin/users/users-table";
import { UsersSkeleton } from "@/components/admin/users/users-skeleton";
import type { IPage } from "@/interfaces/components";


export default async function UsersPage({ searchParams }: IPage) {
    const { page = "1", limit = "8", search = "" } = await searchParams;

    const currentPage = Number(page);
    const currentLimit = Number(limit);

    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16 bg-white md:bg-transparent">
            <div>
                <h1 className="title-page">Listado de Usuarios</h1>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                    ]} 
                    final="Usuarios"
                />
            </div>

            <div className="space-y-5 md:p-5 md:shadow-md bg-white md:rounded-md">
                <div className="flex flex-col md:flex-row gap-3">
                    <InputSearch placeholder="Buscar usuarios"/>
                    <SelectLimit label="usuario" />
                </div>

                <Suspense 
                    key={search + currentPage + limit} 
                    fallback={<UsersSkeleton rows={currentLimit}/>}
                >
                    <UsersTable search={search} page={currentPage} limit={currentLimit}/>   
                </Suspense>
            </div>
        </section>
    )
}
