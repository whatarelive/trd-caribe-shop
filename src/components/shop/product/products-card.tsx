import Link from "next/link";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import { CartCounter } from "@/components/shop/product/cart-counter";
import { Card } from "@/components/ui/card";
import type { ProductClient } from "@/interfaces/models/product.interface";

interface Props {
    product: ProductClient;
    isAuth: boolean;
}

export function ProductCard({ product, isAuth }: Props) {
    return (
        <Card className="max-w-72 p-0 gap-2 bg-white rounded-md shadow-md hover:cursor-pointer hover:shadow-lg">
            <Link href={`/${product.categorie.toLowerCase()}/product/${product.id}`}>
                <picture className="min-w-72 min-h-72">
                    {product.imageUrl ? (
                        <img 
                            src={product.imageUrl ?? "/images/no_data.jpg"} 
                            alt={`Imagen del prodcuto ${product.name}`} 
                            className="object-contain w-72 h-72 rounded-t-md"
                        />
                    ) : (
                        <Image
                            src="/images/no_data.jpg"
                            width={288} height={288}
                            alt="Imagen modelo"
                            className="w-72 h-72 object-cover aspect-video rounded-t-md"
                        />
                    )}
                </picture>

                <div className="flex flex-col p-3">
                    <h3 className="font-medium line-clamp-2">
                        {product.name}
                    </h3>

                    <div className="flex items-center">
                        <Bookmark size={16} className="text-orange-400"/>
                        
                        <span className="font-medium text-orange-400 text-sm">
                            {product.categorie}
                        </span>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                        {product.discount ? (
                            <>
                                <span className="text-lg font-bold">
                                    ${product.finalPrice.toFixed(2)}
                                </span>
                                <span className="text-sm text-muted-foreground line-through">
                                    ${product.price}
                                </span>
                            </>
                        ) : (
                            <span className="text-lg font-bold">
                                ${product.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>

            {/* Operador para establecer el producto en el carrito de compras */}
            { isAuth && <CartCounter id={product.id} stock={product.stock}/> }
        </Card>
    )
}
