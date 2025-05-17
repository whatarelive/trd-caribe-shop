import { TitlePage } from "@/components/admin/title-page";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EditProductForm } from "@/components/admin/products/edit-form";
import { IProducts } from "@/interfaces/models/product.interface";

export default function ProductInfoPage() {
    const product: IProducts = {
        id: 3,
        name: "Papas fritas",
        description: "Patatas, aceites Vegetales (maíz y girasol en proporciones variables), aroma a jamón y queso [suero de LECHE en polvo, sal, potenciadores del sabor (glutamato monosódico, guanilato e inosinato doródicos), azúcar aromas (contienen LECHE, SOJA), colorante (extracto de pimentón)]",
        categorie: "Alimento",
        stock: 110,
        price: 8,
        discount: "20 %",
        image: "https://res.cloudinary.com/dkog2edwi/image/upload/q_auto,f_auto/v1734890328/pizzeton/products/buow4bhufgfygkwdgtve.jpg",
        image_id: "v1734890328/pizzeton/products/buow4bhufgfygkwdgtve",
        image_url: "https://res.cloudinary.com/dkog2edwi/image/upload/q_auto,f_auto/v1734890328/pizzeton/products/buow4bhufgfygkwdgtve.jpg",
        created: "24-5-2025",
        updated: "24-6-2025"
    }

    return (
        <section className="flex flex-col w-full gap-6 p-4 min-[375px]:p-8 xl:pr-16">
            {/* Sección del formulario con fondo blanco y bordes redondeados */}
            <div>
                <TitlePage title="Editar Producto"/>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                        { label: "Productos", destiny: "/admin/products" },
                    ]} 
                    final="Editar Producto"
                />
            </div>

            {/* Formulario de creación de producto */}
            <EditProductForm 
                product={product} 
                categories={[
                    { id:1, name: "Alimento", created: "", updated: "" },
                    { id:2, name: "Ropa", created: "", updated: "" }
                ]}
            />
            
            <div id="modal-create-categorie" />
            <div id="modal-list-categorie"/>
        </section>
    );
}