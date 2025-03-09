import Image from "next/image"
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/src/components/ui/table"

export const ProductsTable = () => {
    return (
        <Table className="min-h-[700px]">
            <TableHeader>
                <TableRow className="border-neutral-300 border-b">
                    <TableHead>
                        Producto
                    </TableHead>
                    <TableHead>
                        Precio
                    </TableHead>
                    <TableHead>
                        Descuento
                    </TableHead>
                    <TableHead>
                        Categoría
                    </TableHead>
                    <TableHead>
                        Disponibilidad
                    </TableHead>
                    <TableHead>
                        Opciones
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { [].map((product, index) => (
                    <TableRow key={index} className="hover:bg-p_gray_100 hover:rounded-lg">
                        <TableCell className="flex gap-4">
                            <Image 
                                src={""} 
                                alt={""}
                                width={64}
                                height={64}
                                loading="lazy"
                                className="rounded-2xl w-16 h-16"
                            />
        
                            <div className="flex flex-col justify-center">
                                {/* <h2 
                                    className={clsx(
                                        'font-medium',
                                        { 
                                        'text-p_green' : product.stock,
                                        'text-p_rose_900' : !product.stock,
                                        }
                                    )}
                                    >
                                        {product.title}
                                </h2>
        
                                <p className="text-wrap text-[13px] line-clamp-2 max-w-[266px] text-p_gray_600">
                                    {product.subtitle}
                                </p> */}
                            </div>
                        </TableCell>
                            
                        <TableCell className="text-p_gray_900 font-medium">
                            {/* $ { 
                                product.price.toString().length === 3 
                                    ? product.price.toPrecision(5)
                                    : product.price.toPrecision(6)
                            } */}
                        </TableCell>
                            
                        <TableCell>
                            {/* <ProductCategory category={product.category}/> */}
                        </TableCell>
                        
                        <TableCell>
                            {/* <ProductDisponibility stock={product.stock}/> */}
                        </TableCell>
                        
                        <TableCell>
                            {/* <ProductOptions productId={product.id} name={product.title}/> */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
