import { notFound } from "next/navigation";
import { getCategories } from "@/actions/categories/get-categories";
import { getProductsInfo } from "@/actions/products/get-product-info";
import { EditProductForm } from "@/components/admin/products/edit-form";
import { CategoriesList } from "@/components/admin/categories/categories-list";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { IPage } from "@/interfaces/components";


export default async function ProductInfoPage({ params }: IPage) {
    const { id } = await params;

    if (!id) notFound();

    const [categories, product] = await Promise.all([
        getCategories(),
        getProductsInfo(+id),
    ]);

    if (!product.result || !product.data) notFound();

    return (
        <section className="flex flex-col w-full gap-6 p-4 min-[375px]:p-8 xl:pr-16">
            <div>
                <h1 className="title-page">Editar Producto</h1>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                        { label: "Productos", destiny: "/admin/products" },
                    ]} 
                    final="Editar Producto"
                />
            </div>

            {/* Formulario de creación de producto */}
           <section className="flex flex-col lg:flex-row gap-6">
                <EditProductForm 
                    product={product.data} 
                    categories={categories.data ?? []}
                />
                <CategoriesList categories={categories.data ?? []} /> 
            </section>
        </section>
    );
}