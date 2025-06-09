'use client'

import { notFound, useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCategoriesStore } from "@/store/categorie-store";
import { ProductList } from "@/components/shop/product/products-list";
import { InputSearch } from "@/components/global/InputSearch";


export default function ProductsCategoriePage() {
    const { data: session } = useSession();
    const { categorie } = useParams();
    const searchParams = useSearchParams();

    const getCategorieId = useCategoriesStore((state) => state.getCategorieId);

    const formatCategorie = decodeURIComponent(categorie?.toString()!);
    const { id } = getCategorieId(formatCategorie);
    
    if (!id) notFound();        
    
    const page = Number(searchParams.get("page") ?? "1");
    const search = searchParams.get("search") ?? undefined;

    return (
        <>
            {/* Encabezado de la página */}
            <section className="mb-8 w-full px-6 lg:p-0">
                <div className="mb-8">
                    <h1 className="text-xl font-medium lg:text-3xl">
                        Categoría de {formatCategorie}
                    </h1>
                    <p className="text-muted-foreground text-sm lg:text-base">
                        Todos los productos disponibles
                    </p>
                </div>

                <InputSearch placeholder="Buscar productos" className="min-w-full"/>
            </section>

            {/* Listado de productos de la categoría */}    
            <ProductList 
                page={page}
                isAuth={session?.isAuthenticated ?? false}
                categorie={id}
                search={search}
            />
        </>
    )
}
