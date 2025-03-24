import { TitlePage } from "@/components/admin/title-page";
import { ToolsSectionPage } from "@/components/admin/tools-section-page";
import { ProductsTable } from "@/components/admin/products/products-table";
import { BreadcrumbsPage } from "@/components/admin/breadcrumbs-page";

export default function ProductsPage() {
    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16">
            <div>
                <TitlePage title="Listado de Productos"/>

                <BreadcrumbsPage 
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
            
            <ProductsTable />   
        </section>
    );
}