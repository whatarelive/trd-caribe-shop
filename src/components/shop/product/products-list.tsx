'use client'

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/shop/product/products-card";
import { Button } from "@/components/ui/button";
import { productsForShop as demoProducts } from "@/lib/data/products";


export const ProductsList = () => {
    const [ products, setProducts ] = useState(demoProducts);

    useEffect(() => {
      
    }, []);

    const addMoreProducts = async () => {
        // Se hace la petición para más productos
        setProducts([...products, ...demoProducts])
    }
    
    return (
        <section className="flex flex-col items-center select-none">
            <ul className="flex flex-wrap gap-6 justify-center w-fit mb-8">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product}/>
                ))}
            </ul>

            <Button onClick={addMoreProducts}>
                Cargar más
            </Button>
        </section>
    )
}
