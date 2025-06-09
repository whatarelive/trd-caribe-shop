'use client'

import { useEffect, useState } from "react";
import { getProductsByCategorie } from "@/actions/products/get-poducts-categories";
import { ProductCard } from "@/components/shop/product/products-card";
import { ProductListSkeleton } from "@/components/shop/product/skeletons";
import { Pagination } from "@/components/ui/pagination";
import { showErrorToast } from "@/components/ui/sonner";
import type { IFilters } from "@/interfaces/components";
import type { ProductClient } from "@/interfaces/models/product.interface";


interface Props extends Omit<IFilters, "limit"> {
    isAuth: boolean;
    categorie: number;
}

export function ProductList({ page, categorie, search, isAuth }: Props) {
    const [count, setCount] = useState<number>(0);
    const [products, setProducts] = useState<ProductClient[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {    
        setIsLoading(true);

        getProductsByCategorie({ page, limit: 10, categorie, search })
            .then(({ data, count, result, error }) => {
                if (!result || !data || !count) {
                    return showErrorToast({ title: error! });
                }

                setProducts(data);
                setCount(count);
            })
            .finally(() => setIsLoading(false));

    }, [page, categorie, search]);

    return (
        <section className="flex flex-col items-center justify-center select-none mt-4">
            {!isLoading ? (
                <ul className="flex flex-wrap gap-6 mb-8 justify-center lg:justify-start w-full">
                    {products.map((product, index) => (
                        <li key={index}>
                            <ProductCard product={product} isAuth={isAuth}/>
                        </li>
                    ))}
                </ul>
            ) : (
                <ProductListSkeleton cant={8}/>
            )}

            <Pagination count={count} currentPage={page} limit={10} />
        </section>
    )
}
