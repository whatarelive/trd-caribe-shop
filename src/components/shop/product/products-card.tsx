import Link from "next/link";
import { MdBookmarkBorder } from "react-icons/md";
import { CartCounter } from "@/components/shop/product/cart-counter";

import type { FC } from "react";
import type { IProducts } from "@/interfaces/models/product.interface";

type ProductProps = Pick<IProducts, "id" | "name" | "categorie" | "description" | "price" | "image">;

export const ProductCard: FC<{ product: ProductProps }> = ({ product }) => {
    return (
        <li className="max-w-72 h-fit gap-2 z-0 bg-white rounded-md shadow-md hover:cursor-pointer hover:shadow-lg">
            <Link href={`/${product.categorie.toLowerCase()}/product/${product.id}`}>
                <picture>
                    <img 
                        src={product.image} 
                        alt={`Imagen del prodcuto ${product.name}`} 
                        className="w-72 h-72 object-cover aspect-video rounded-t-md"
                        />
                </picture>

                <div className="flex flex-col p-3">
                    <h3 className="font-medium line-clamp-2">
                            {product.name}
                    </h3>

                    <div className="flex items-center">
                        <MdBookmarkBorder size={16} className="text-orange-400"/>
                        
                        <span className="font-medium text-orange-400 text-sm">
                            { product.categorie }
                        </span>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg font-bold">
                            ${ product.price.toFixed(2)}
                        </span>
                    
                        {product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                                ${product.price + 20}
                            </span>
                        )}
                    </div>
                </div>
            </Link>

            {/* Operador para establecer el producto en el carrito de compras */}
            <CartCounter stock={20}/>
        </li>
    )
}
