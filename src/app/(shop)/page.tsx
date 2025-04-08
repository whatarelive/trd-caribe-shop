import Link from "next/link";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { ProductCard } from "@/components/shop/product/products-card";
import { productsForShop } from "@/lib/data/products";
import { HomeCarousel } from "@/components/shop/HomeCarousel";

export default function HomePage() {
    return (
        <>
            {/* Sección del Carousel */}
            <HomeCarousel/>

            {/* Sección de productos destacados */}
            <section className="flex flex-col max-w-7xl m-auto w-fit gap-6 mt-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-medium">
                        Productos destacados
                    </h3>

                    <Link href="/categories/" className="inline-flex gap-1.5 items-center text-gray-500 hover:text-orange-500">
                        <span>Ver Más</span>
                        <MdOutlineArrowForwardIos size={16}/>
                    </Link>
                </div>

                {/* Lista de productos */}
                <ul className="flex flex-wrap gap-6 justify-center w-fit">
                    {
                        productsForShop.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))
                    }
                </ul>
            </section>

            {/* Sección sobre promociones */}
            <section className="bg-gray-100 py-12 mt-8">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Envío gratis en pedidos superiores a $1000
                        </h2>
                        <p className="mt-4 max-w-2xl text-muted-foreground">
                            Disfruta de envío gratuito en todos tus pedidos superiores a $1000. Además, si te registras hoy, recibirás
                            un 10% de descuento en tu primera compra.
                        </p>
                        <Link href="/auth/register" className="button-primary mt-6">
                            Registrarse ahora
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
