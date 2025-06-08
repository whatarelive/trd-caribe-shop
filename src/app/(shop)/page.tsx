import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import { CategoriesList } from "@/components/shop/home/categories-list";
import { CommentsCarousel } from "@/components/shop/home/comments-carousel";
import { AdvertisingCarousel } from "@/components/shop/home/advertising-carousel";
import { ProductProminentList } from "@/components/shop/home/prominent-products-list";
import { CommentsCarouselSkeleton } from "@/components/shop/home/skeletons";
import { ProductListSkeleton } from "@/components/shop/product/skeletons";
import { buttonVariants } from "@/components/ui/button";


/** 
 * @description Componente Page que define la página principal 
 * de la tienda virtual
*/ 
export default function HomePage() {
    return (
        <>                
            <AdvertisingCarousel/>

            {/* Seccion de categorías para dispositivos desktop */}
            <section className="hidden lg:px-5 lg:container lg:mx-auto lg:flex lg:flex-col lg:gap-4 lg:mt-12 xl:p-0">
                <h3 className="font-medium md:text-2xl">
                    Categorías de Productos
                </h3>

                <CategoriesList/>
            </section>

            {/* Sección de productos destacados */}
            <section className="container flex flex-col mx-auto px-5 gap-4 mt-12 xl:p-0">
                <h3 className="font-medium md:text-2xl">
                    Productos destacados
                </h3>

                <Suspense fallback={<ProductListSkeleton/>}>
                    <ProductProminentList/>
                </Suspense>
            </section>

            <section className="container flex flex-col mx-auto px-5 gap-4 my-12 2xl:p-0">
                <div className="flex justify-between">
                    <h3 className="font-medium md:text-2xl">
                        Comentarios de los clientes
                    </h3>

                    <Link href="/comments" className="inline-flex items-center gap-1">
                        Ver más
                        <ChevronRight size={20}/>
                    </Link>
                </div>

                <Suspense fallback={<CommentsCarouselSkeleton/>}>
                    <CommentsCarousel/>
                </Suspense>
            </section>

            {/* Sección sobre promociones */}
            <section className="px-5 py-8 mt-12 bg-neutral-200/50 rounded-md">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl lg:text-3xl">
                        Descubre los Mejores Productos 
                    </h2>
                    
                    <p className="mt-4 text-sm max-w-2xl text-muted-foreground md:text-base">
                        Disfruta de las mejores ofertas de promoción por productos del mercado 
                        para nuestros nuevos clientes.
                    </p>

                    <Link href="/auth/register" className={buttonVariants({ className: "mt-4" })}>
                        Registrarse ahora
                    </Link>
                </div>
            </section>
        </>
    )
}
