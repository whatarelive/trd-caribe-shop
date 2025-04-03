import Link from "next/link";
import { MdInfoOutline } from "react-icons/md";
import { Pagination } from "@/components/ui/pagination/pagination";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table"
import { SalesCard } from "@/components/admin/sales/sales-card";
import { SaleMethod, SaleStatus } from "@/components/admin/sales/sales-utils";
import { UserNameView } from "@/components/admin/users/users-utils";
import { sales } from "@/lib/data/sales";

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
            <Table>
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
                    {sales.map(({ id, payment_method, status, total, user }) => (
                        <TableRow key={id} className="lg:bg-white lg:border-b-2 lg:border-gray-200">
                            <TableCell>
                                <UserNameView value={user}/>
                            </TableCell>
                            <TableCell>
                                $ {total}
                            </TableCell>
                            <TableCell>
                                <SaleStatus status={status}/>
                            </TableCell>
                            <TableCell>
                                <SaleMethod method={payment_method}/>
                            </TableCell>    
                            <TableCell>
                                <Link href={`/admin/sales/${id}`} className="button-primary-v2">
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
