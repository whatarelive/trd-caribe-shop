import clsx from "clsx";
import Link from "next/link";
import { MdInfoOutline } from "react-icons/md";
import { SalesCard } from "@/components/admin/sales/sales-card";
import { Pagination } from "@/components/ui/pagination/pagination";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table"
import { sales } from "@/lib/data/sales";
import { SaleMethodPayment, SaleStatus } from "@/utils/enums";

export const SalesTable = () => {
    return (
        <>
            {/* Listado de ventas para dispositivos moviles */}
            <ul className="flex flex-col gap-2 bg-gray-50 p-2 lg:hidden">
                {sales.map((sale) => (
                    <SalesCard
                        key={sale.id} 
                        sale={sale}
                    />
                ))}
            </ul>

            {/* Tabla de ventas para dispositivos de escritorio */}
            <Table className="hidden lg:bg-gray-50 p-4 lg:table lg:table-fixed lg:border-spacing-6 lg:border-8 lg:border-gray-50">
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Cliente
                        </TableHead>
                        <TableHead>
                            Monto Total
                        </TableHead>
                        <TableHead>
                            Estado
                        </TableHead>
                        <TableHead>
                            Método de pago
                        </TableHead>
                        <TableHead>
                            Opciones
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { sales.map((sale) => (
                        <TableRow key={ sale.id } className="lg:border-b-2 h-14 lg:border-gray-200 lg:bg-white">
                            <TableCell>
                                <span className="line-clamp-1">
                                    { sale.user }
                                </span>
                            </TableCell>
                                
                            <TableCell>
                                $ { sale.total }
                            </TableCell>

                            <TableCell>
                                <span className={clsx(
                                    "p-1 text-sm rounded-md border", 
                                    { 
                                        "bg-blue-100 text-blue-500 border-blue-500": sale.status === "PAID",
                                        "bg-neutral-100 text-neutral-500 border-neutral-500": sale.status === "PENDING",
                                        "bg-yellow-100 text-yellow-500 border-y-amber-500": sale.status === "SHIPPED",
                                        "bg-green-100 text-green-500 border-green-500" : sale.status === "DELIVERED", 
                                        "bg-red-100 text-red-500 border-e-red-500" : sale.status === "CANCELED" 
                                    }
                                )}>
                                    { SaleStatus[sale.status] }
                                </span>
                            </TableCell>

                            <TableCell>
                                { SaleMethodPayment[sale.payment_method] }
                            </TableCell>    
                            
                            <TableCell>
                                <Link 
                                    href={`/admin/sales/${sale.id}`} 
                                    className="inline-flex items-center gap-2 font-medium p-2 rounded-md border border-neutral-300 hover:bg-blue-400 hover:text-white hover:border-blue-400"
                                >
                                    <MdInfoOutline size={20}/>
                                    Detalles
                                </Link>
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
