import { getCategories } from "@/actions/categories/get-categories";
import { CreateProductForm } from "@/components/admin/products/create-form";
import { CategoriesList } from "@/components/admin/categories/categories-list";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";


export default async function ProductCreatePage() {
    const { data = [] } = await getCategories();

    return (
        <section className="flex flex-col w-full gap-6 p-4 min-[375px]:p-8 xl:pr-16">
            <div>
                <h1 className="title-page">Crear Producto</h1>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                        { label: "Productos", destiny: "/admin/products" },
                    ]} 
                    final="Crear Producto"
                />
            </div>

            {/* Formulario de creación de producto */}
            <section className="flex flex-col lg:flex-row gap-6">
                <CreateProductForm categories={data} />   
                <CategoriesList categories={data} /> 
            </section>
        </section>
    );
}