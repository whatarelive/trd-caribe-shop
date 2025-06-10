import { PaginationSkeleton } from "@/components/admin/pagination-skeleton";
import { ProductCardSkeleton } from "@/components/admin/products/product-card-skeleton";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";


export function ProductsSkeleton({ rows }: { rows: number }) {
    const array = Array.from({ length: rows });

    return (
        <>
            <ul className="flex flex-col gap-5 lg:hidden">
                {array.map((_, index) => <ProductCardSkeleton key={index}/> )}
            </ul>

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
                    { array.map((_, index) => (
                        <TableRow key={index} className="lg:border-b-1 lg:border-gray-200 lg:bg-white">
                            <TableCell className="w-60">
                                <div className="flex items-center gap-4">
                                    <span className="skeleton w-24 h-16"/>
                
                                    <div className="flex flex-col justify-center">
                                        <div className="skeleton w-32 h-6 mb-1"/>
                
                                        <div className="skeleton w-60 h-4 mb-0.5"/>
                                        <div className="skeleton w-60 h-4"/>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="skeleton w-16 h-6"/>
                            </TableCell>
                            <TableCell>
                                <span className="skeleton w-16 h-5"/>
                            </TableCell>
                            <TableCell>
                                <span className="skeleton w-16 h-5"/>
                            </TableCell>
                            <TableCell>
                                <span className="skeleton w-12 h-5"/>
                            </TableCell>    
                             <TableCell>
                                <span className="skeleton w-16 h-5"/>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center items-center gap-4">
                                    <span className="skeleton w-10 h-8"/>
                                    <span className="skeleton w-10 h-8"/>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            <PaginationSkeleton/>
        </>
    )
}
