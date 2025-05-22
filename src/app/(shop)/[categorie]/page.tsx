import { Title } from "@/components/shop/Title";
import { ProductsList } from "@/components/shop/product/products-list";

interface PageProps {
    params: Promise<{ categorie: string }>;
}

export default async function ProductsCategoriePage({ params }: PageProps) {
    const categorie = (await params).categorie;

    return (
        <>
            <Title 
                title={`Categoría de ${categorie}`} 
                subtitle="Todos los productos disponibles"
            />

            {/* Listado de productos de la categoría */}
            <ProductsList/>
        </>
    )
}
