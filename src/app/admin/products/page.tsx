import { Suspense } from "react";
import { TitlePage } from "@/components/admin/title-page";
import { ToolsSectionPage } from "@/components/admin/tools-section-page";
import { ProductsTable } from "@/components/admin/products/products-table";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function ProductsPage() {
    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16">
            <div>
                <TitlePage title="Listado de Productos"/>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                    ]} 
                    final="Productos"
                />
            </div>

            <ToolsSectionPage 
                placeholder="Buscar producto" 
                destiny="/admin/products/create" 
                label="Nuevo Producto"
            />
            
            <Suspense fallback={<p>Cargando...</p>}>
                <ProductsTable />   
            </Suspense>
        </section>
    );
}