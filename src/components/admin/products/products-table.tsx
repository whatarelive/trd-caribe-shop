import Link from 'next/link';
import { MdOutlineEdit } from "react-icons/md";
import { ButtonDeleteItem } from '@/components/admin/buttons';
import { Pagination } from '@/components/ui/pagination';
import { ProductCard } from '@/components/admin/products/product-card';
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table"
import { products } from "@/lib/data/products";

export const ProductsTable = () => {
    return (
        <>
            {/* Listado de productos para dispositivos moviles */}
            <ul className="flex flex-col gap-2 bg-gray-50 p-2 lg:hidden">
                {products.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        product={product}
                    />
                ))}
            </ul>

            {/* Tabla de productos para dispositivos de escritorio */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-60">
                            Producto
                        </TableHead>
                        <TableHead>
                            Categoría
                        </TableHead>
                        <TableHead>
                            Existencia
                        </TableHead>
                        <TableHead>
                            Precio x Unidad
                        </TableHead>
                        <TableHead>
                            Opciones
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { products.map((product) => (
                        <TableRow key={product.id} className="lg:border-b-2 lg:border-gray-200 lg:bg-white">
                            <TableCell className="w-60">
                                <div className="flex items-center gap-4">
                                    <picture>
                                        <img 
                                            src={product.image} 
                                            alt={`Imagen del producto ${product.image}`}
                                            width={64}
                                            height={64}
                                            loading="lazy"
                                            className="rounded-xl min-w-16 h-16"
                                        />
                                    </picture>
                
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
                                <span className="font-medium text-sm text-white bg-orange-400 py-1 px-2 rounded-sm max-w-40 w-fit line-clamp-1">
                                    { product.categorie }
                                </span>
                            </TableCell>
                            <TableCell>
                                { product.stock } unidades
                            </TableCell>
                            <TableCell className="font-medium">
                                $ { product.price }
                            </TableCell>    
                            <TableCell>
                                <div className="inline-flex items-center gap-4">
                                    <Link href={`/admin/products/${product.id}`} className="button-primary-v2">
                                        <MdOutlineEdit size={20}/>
                                    </Link>

                                    <ButtonDeleteItem/>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                        
            {/* Componente para la paginación de los productos */}
            <Pagination currentPage={1} totalPages={8} className="hidden md:flex"/>
        </>
    )
}
