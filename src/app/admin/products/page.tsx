import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductsTable } from "@/components/admin/products/products-table";
import { ProductsSkeleton } from "@/components/admin/products/products-skeleton";
import { InputSearch } from "@/components/global/InputSearch";
import { SelectOrderBy } from "@/components/global/SelectOrderBy";
import { SelectLimit } from "@/components/global/SelectLimit";
import { buttonVariants } from "@/components/ui/button";
import type { IPage } from "@/interfaces/components";

const filters = [
    { label: "Precio", value: "price" },
    { label: "Precio Final", value: "final_price" },
];

export default async function ProductsPage({ searchParams }: IPage) {
    const { page = "1", limit = "6", search = "", ordering } = await searchParams;

    const currentPage = Number(page);
    const currentLimit = Number(limit);

    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16 bg-white md:bg-transparent">
            <div>
                <h1 className="title-page">Listado de Productos</h1>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                    ]} 
                    final="Productos"
                />
            </div>

            <div className="space-y-5 md:p-5 md:shadow-md bg-white md:rounded-md">
                <div className="flex flex-col md:flex-row gap-3">
                    <InputSearch placeholder="Buscar productos"/>
                    <SelectOrderBy filters={filters}/>
                    <SelectLimit count={6} label="producto"/>
                    <Link 
                        href="/admin/products/create/" 
                        className={buttonVariants({ variant: "default", className: "h-11" })}
                    >
                        <Plus className="w-6 h-6"/>
                        Crear Producto
                    </Link>
                </div>

                <Suspense 
                    key={currentPage + currentLimit + search + ordering} 
                    fallback={<ProductsSkeleton rows={6}/>}
                >
                    <ProductsTable 
                        page={currentPage} 
                        limit={currentLimit} 
                        search={search} 
                        ordering={ordering} 
                    />   
                </Suspense>
            </div>
        </section>
    );
}