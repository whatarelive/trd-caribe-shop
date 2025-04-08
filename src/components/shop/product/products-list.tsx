"use client";

import { useState } from "react";
import { ProductCard } from "@/components/shop/product/products-card";
import { productsForShop as demoProducts } from "@/lib/data/products";

export const ProductsList = () => {
    const [products, setProducts] = useState(demoProducts);

    const addMoreProducts = async () => {
        // Se hace la petición para más productos
        setProducts([...products, ...demoProducts])
    }
    
    return (
        <section className="flex flex-col items-center max-w-7xl m-auto w-fit my-8 select-none">
            <ul className="flex flex-wrap gap-6 justify-center w-fit mb-8">
                {
                    products.map((product, index) => (
                        <ProductCard key={index} product={product}/>
                    ))
                }
            </ul>

            <button className="button-primary w-fit" onClick={addMoreProducts}>
                Ver más
            </button>
        </section>
    )
}
