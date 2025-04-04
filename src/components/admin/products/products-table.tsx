import Link from 'next/link';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { Pagination } from '@/components/ui/pagination/pagination';
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
                                    <Link 
                                        href={`/admin/products/${product.id}`} 
                                        className="p-2 rounded-md border border-neutral-500 hover:bg-blue-400 hover:text-white hover:border-blue-400"
                                    >
                                        <MdOutlineEdit size={20}/>
                                    </Link>

                                    <button 
                                        className="p-2 rounded-md border border-neutral-500 hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer"
                                    >
                                        <MdDeleteOutline size={20}/>
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                        
            {/* Componente para la paginación de los productos */}
            <Pagination totalPages={8} className="hidden md:flex"/>
        </>
    )
}
