import Link from "next/link";
import { Info } from "lucide-react";
import { getSales } from "@/actions/sales/get-sales";
import { SaleStatus } from "@/components/global/SaleStatus";
import { SaleMethod } from "@/components/global/SaleMethod";
import { ErrorSection } from "@/components/global/ErrorSection";
import { SalesCard } from "@/components/admin/sales/sales-card";
import { Avatar } from "@/components/ui/avatar";
import { Pagination } from "@/components/ui/pagination";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableCaption } from "@/components/ui/table";
import type { IFilters } from "@/interfaces/components";


const columns = ["Cliente", "Monto Total", "Estado", "Método de pago", "Opciones"];

export async function SalesTable({ page, limit, search }: IFilters) {
    // Se carga el listado de usuarios desde el Backend según los filtros activos.
    const sales = await getSales({ page, limit, search });

    // Mensajes de en la UI según el error que ocurra.
    if (sales.count === 0 && search && search.length !== 0) 
        return <ErrorSection variant="search"/>
    
    if (sales.count === 0 && !search) 
        return <ErrorSection variant="data"/>
    
    if (!sales.result || !sales.count) 
        return <ErrorSection variant="error"/>


    return (
        <>
            {/* Listado de ventas para dispositivos moviles */}
            <ul className="flex flex-col gap-5 lg:hidden w-full">
                {sales.data.map((sale) => (
                    <SalesCard key={sale.id} sale={sale}/>
                ))}
            </ul>

            {/* Tabla de ventas para dispositivos de escritorio */}
            <Table>
                <TableCaption>
                    Se mostraron <b>{ limit > sales.count ? sales.count : limit } </b> 
                    ventas de <b>{sales.count}</b> en total 
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        {columns.map((colm, index) => (
                            <TableHead key={index}>{colm}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sales.data.map(({ id, total, method, status, user }) => (
                        <TableRow key={id} className="lg:bg-white lg:border-b-1 lg:border-gray-200">
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Avatar>{user.slice(0, 2)}</Avatar>
                                    <h3 className="font-medium">{user}</h3>
                                </div>
                            </TableCell>
                            <TableCell>
                                $ {total}
                            </TableCell>
                            <TableCell>
                                <SaleStatus status={status}/>
                            </TableCell>
                            <TableCell>
                                <SaleMethod method={method}/>
                            </TableCell>    
                            <TableCell>
                                <Link href={`/admin/sales/${id}`} className={buttonVariants({ variant: "outline" })}>
                                    <Info size={20}/>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                        
            {/* Componente para la paginación de los productos */}
            <Pagination 
                limit={limit}  
                currentPage={page} 
                count={sales.count} 
                className="hidden md:flex"
            />
        </>
    )
}
