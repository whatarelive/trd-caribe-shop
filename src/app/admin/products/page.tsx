import { TitlePage } from "@/components/admin/title-page";
import { ToolsSectionPage } from "@/components/admin/tools-section-page";
import { ProductsTable } from "@/components/admin/products/products-table";
import { ProductsList } from "@/components/admin/products/products-list";
import { BreadcrumbsPage } from "@/components/admin/breadcrumbs-page";

export default function ProductsPage() {
    return (
        <section className="flex flex-col gap-6 py-8 pl-8 pr-16">
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
            
            <div className="lg:hidden">
                <ProductsList />
            </div>
        </section>
    );
}