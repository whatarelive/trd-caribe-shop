import Link from "next/link";
import { Blocks, DollarSign, Edit2, Trash2 } from "lucide-react";
import { deleteProduct } from "@/actions/products/delete-product";
import { AlertModal } from "@/components/global/AlertModal";
import { DataSection } from "@/components/admin/data-section";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { IProduct } from "@/interfaces/models/product.interface";


export function ProductCard({ product }: { product: IProduct }) {
    return (
         <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="font-medium line-clamp-2 max-w-3/5">
                    {product.name}
                </CardTitle>

                <CardDescription className="text-wrap text-sm line-clamp-3 text-neutral-500">
                    {product.description}
                </CardDescription>
            </CardHeader>
            
            <CardContent>
                <div className="flex justify-between">
                    <Badge variant="category">
                        { product.categorie }
                    </Badge>

                    <Badge variant={ product.discount ? "acept" : "outline" }>
                        $ { (product.price - product.finalPrice).toFixed(2) }
                    </Badge>
                </div>

                <div className="flex flex-col justify-start gap-4 mt-3">
                    <DataSection
                        label="Existencias"
                        value={`${product.stock} unidades`}
                        icon={<Blocks className="text-blue-500 w-4 h-4"/>}
                    />

                    <DataSection
                        label="Precio x unidad"
                        value={`$ ${product.price}`}
                        icon={<DollarSign className="text-red-500 w-4 h-4"/>}
                    />

                    <DataSection
                        label="Precio final"
                        value={`$ ${product.finalPrice}`}
                        icon={<DollarSign className="text-green-500 w-4 h-4"/>}
                    />
                </div>
            </CardContent>

            <CardFooter className="flex gap-3">
                <Link 
                    href={`/admin/products/${product.id}`} 
                    className={buttonVariants({ variant: "default", className: "h-11 grow" })}
                >
                    <Edit2 size={24}/>
                    Editar
                </Link>

                <AlertModal
                    title="Eliminar Producto" 
                    message={`Deseas eliminar el producto ${product.name} de la plataforma`} 
                    action={deleteProduct.bind(null, product.id)} 
                >
                    <Button type="button" variant="outline" className="h-11 grow">
                        <Trash2 size={24}/>
                        Eliminar
                    </Button>
                </AlertModal>
            </CardFooter>
        </Card>
    )
}
