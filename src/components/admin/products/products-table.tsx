import Link from "next/link";
import { Edit2, Trash2 } from "lucide-react";
import { getProducts } from "@/actions/products/get-products";
import { deleteProduct } from "@/actions/products/delete-product";
import { AlertModal } from "@/components/global/AlertModal";
import { LoadingImage } from "@/components/global/LodingImage";
import { ErrorSection } from "@/components/global/ErrorSection";
import { ProductCard } from "@/components/admin/products/product-card";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import type { IFilters } from "@/interfaces/components";


export async function ProductsTable({ page, limit, search, ordering }: IFilters) {
    const products = await getProducts({ page, limit, search, ordering });

     // Mensajes de en la UI según el error que ocurra.
    if (products.count === 0 && search && search.length !== 0)
        return <ErrorSection variant="search"/>

    if (products.count === 0 && !search)
        return <ErrorSection variant="data"/>
    
    if (!products.result || !products.count) 
        return <ErrorSection variant="error"/>

    return (
        <>
            {/* Listado de productos para dispositivos moviles */}
            <ul className="flex flex-col gap-5 lg:hidden">
                {products.data.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </ul>

            {/* Tabla de productos para dispositivos de escritorio */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-64">
                            Producto
                        </TableHead>
                        <TableHead className="w-16">
                            Categoría
                        </TableHead>
                        <TableHead className="w-24">
                            Existencia
                        </TableHead>
                        <TableHead className="w-20">
                            Precio Base
                        </TableHead>
                        <TableHead className="w-20">
                            Descuento
                        </TableHead>
                        <TableHead className="w-20">
                            Precio Final
                        </TableHead>
                        <TableHead className="text-center">
                            Opciones
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { products.data.map((product) => (
                        <TableRow key={product.id} className="lg:border-b-1 lg:border-gray-200 lg:bg-white">
                            <TableCell className="w-60">
                                <div className="flex items-center gap-4">
                                    <LoadingImage 
                                        src={product.imageUrl ?? "/images/no_data.jpg"}
                                        alt={`Imagen del producto ${product.name}`}
                                        width={96} height={64}
                                        className="object-contain min-w-24 h-16 rounded-md"
                                    />
                
                                    <div className="flex flex-col justify-center">
                                        <h3 className="font-medium line-clamp-1">
                                            {product.name}
                                        </h3>
                
                                        <p className="text-wrap text-[13px] line-clamp-2 pr-12 text-neutral-500">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="category">
                                    {product.categorie}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {product.stock} unidades
                            </TableCell>
                            <TableCell>
                                $ {product.price}
                            </TableCell>
                            <TableCell>
                                <Badge variant={product.discount ? "acept" : "outline"}>
                                    $ {(product.price - product.finalPrice).toFixed(2)}
                                </Badge>
                            </TableCell>    
                             <TableCell>
                                $ {product.finalPrice}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center items-center gap-4">
                                    <Link 
                                        href={`/admin/products/${product.id}`} 
                                        className={buttonVariants({ variant: "outline" })}
                                    >
                                        <Edit2 size={20}/>
                                    </Link>

                                    <AlertModal
                                        title="Eliminar Producto" 
                                        message={`Deseas eliminar el producto ${product.name} de la plataforma`} 
                                        action={deleteProduct.bind(null, product.id)} 
                                    >
                                        <Button type="button" variant="outline" size="icon">
                                            <Trash2 size={24}/>
                                        </Button>
                                    </AlertModal>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                        
            {/* Componente para la paginación de los productos */}
            <Pagination 
                limit={limit} 
                currentPage={page} 
                count={products.count} 
                className="hidden md:flex"
            />
        </>
    )
}
