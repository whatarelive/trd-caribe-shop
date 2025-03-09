import { CreateProductForm } from "@/src/components/admin/products/create-form";

/**
 * Página para la creación de nuevos productos en el panel de administración.
 * Esta página proporciona una interfaz para que los administradores puedan
 * agregar nuevos productos al catálogo de la tienda.
 */
export default function ProductCreatePage() {
    return (
        <section className="w-full sm:p-4 md:p-12">
            {/* Sección del formulario con fondo blanco y bordes redondeados */}
            <section className="flex flex-col justify-between bg-white rounded-lg p-6 sm:p-8">
                {/* Título de la página */}
                <h1 className="text-2xl lg:text-3xl font-semibold text-neutral-500">
                    Crear producto
                </h1>
            
                {/* Formulario de creación de producto */}
                <CreateProductForm />
            </section>
        </section>
    );
}