import { TitlePage } from "@/components/admin/title-page";
import { ToolsSectionPage } from "@/components/admin/tools-section-page";
import { ProductsTable } from "@/components/admin/products/products-table";
import { ProductsList } from "@/components/admin/products/products-list";

export default function ProductsPage() {
    return (
        <section className="flex flex-col gap-6 py-8 pl-8 pr-16">
            <TitlePage title="Listado de Productos"/>

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