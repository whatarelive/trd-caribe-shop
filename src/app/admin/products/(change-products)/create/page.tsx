import { redirect } from "next/navigation";
import { TitlePage } from "@/components/admin/title-page";
import { BreadcrumbsPage } from "@/components/admin/breadcrumbs-page";
import { getCategories } from "@/actions/categories/get-categories";
import { CreateProductForm } from "@/components/admin/products/create-form";

/**
 * Página para la creación de nuevos productos en el panel de administración.
 * Esta página proporciona una interfaz para que los administradores puedan
 * agregar nuevos productos al catálogo de la tienda.
 */
export default async function ProductCreatePage() {
    const data = await getCategories();

    if (!data) {
        return redirect("/admin/products");
    }

    return (
        <section className="flex flex-col w-full gap-6 p-4 min-[375px]:p-8 xl:pr-16">
            {/* Sección del formulario con fondo blanco y bordes redondeados */}
            <div>
                <TitlePage title="Creación de Productos"/>

                <BreadcrumbsPage 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                        { label: "Productos", destiny: "/admin/products" },
                    ]} 
                    final="Crear Producto"
                />
            </div>

            {/* Formulario de creación de producto */}
            <CreateProductForm categories={[{ id:1, name: "Alimentos", created: "", updated: "" }]}/>
            
            <div id="modal-create-product" />
        </section>
    );
}