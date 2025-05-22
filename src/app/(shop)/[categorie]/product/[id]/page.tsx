import { fontText } from "@/config/fonts";
import { Title } from "@/components/shop/Title";
import { productsForShop } from "@/lib/data/products"
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CartCounter } from "@/components/shop/product/cart-counter";

const product = productsForShop[0];

interface PageProps {
    params: Promise<{ categorie: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const categorie = (await params).categorie;

    return (
        <>
            <section className="max-w-7xl mx-auto">
                <Title title="Detalles del producto"/>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/" },
                        { label: `Categoría de ${categorie}`, destiny: `/${categorie}` }
                    ]} 
                    final="Detalles"
                />
            </section>


            <section className="max-w-7xl flex flex-col mt-8 lg:flex-row gap-8 mx-auto">
                {/* Imagen del producto */}
                <picture>
                    <img 
                        src={product.image} 
                        alt={`Imagen del producto ${product.name}`}
                        width={1200} height={800}
                        className="object-cover rounded-md"
                    />
                </picture>

                {/* Detalles del producto */}
                <div className="col-span-1 px-5 bg-white p-4 rounded-md h-fit shadow-lg">
                    <h1 className="antialiased text-xl font-bold">
                        { product.name }
                    </h1>

                    <div className="mb-1 flex items-center gap-2">
                        <span className="text-lg font-bold">
                            ${ product.price.toFixed(2)}
                        </span>
                    
                        {product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                                ${product.price + 20}
                            </span>
                        )}

                    </div>

                    <div className="mb-4">
                        <span>
                            Disponibles: { product.stock } unidades
                        </span>
                    </div>

                    {/* Quantity selector */}
                    <CartCounter 
                        stock={product.stock} 
                        className="p-0 mb-4"
                    />
        
                    {/* Description */}
                    <h3 className="font-bold text-sm">Descripción</h3>
                    
                    <p className={`${ fontText.className } antialiased font-light`}>
                        { product.description }
                    </p>
                </div>
            </section>
        </>
    )
}
