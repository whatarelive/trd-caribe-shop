import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { ButtonDeleteItem } from "@/components/admin/buttons";
import { PromotionCard } from "@/components/admin/promotions/promotion-card";
import { PromotionChoice } from "@/components/admin/promotions/promotions-utils";
import { promotions } from "@/lib/data/promotions";

export const PromotionsTable = () => {
    return (
        <>
            {/* Listado de promociones para dispositivos moviles */}
            <ul className="flex flex-col gap-2 bg-gray-50 p-2 lg:hidden">
                {promotions.map((promo) => (
                    <PromotionCard
                        key={promo.id} 
                        promotion={promo}
                    />
                ))}
            </ul>

            {/* Tabla de promociones para dispositivos de escritorio */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Promoción
                        </TableHead>
                        <TableHead>
                            Porciento
                        </TableHead>
                        <TableHead>
                            Tipo
                        </TableHead>
                        <TableHead>
                            Valor Minimo
                        </TableHead>
                        <TableHead>
                            Valor Máximo
                        </TableHead>
                        <TableHead>
                            Opciones
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { promotions.map(({ id, name, choice, porcentage, max_price, min_price }) => (
                        <TableRow key={id} className="lg:border-b-2 lg:border-gray-200 lg:bg-white">
                            <TableCell>
                                <span className="line-clamp-1">
                                    {name}
                                </span>
                            </TableCell>
                            <TableCell>
                                {porcentage} %
                            </TableCell>
                            <TableCell>
                                <PromotionChoice choice={choice}/>
                            </TableCell>
                            <TableCell>
                                {min_price ? `$ ${min_price}` : "-"}
                            </TableCell>
                            <TableCell>
                                {max_price ? `$ ${max_price}` : "-"}
                            </TableCell>
                            <TableCell>
                                <div className="inline-flex items-center gap-4">
                                    <Link href={`/admin/promotions/${id}`} className="button-primary-v2">
                                        <MdOutlineEdit size={20}/>
                                    </Link>

                                    <ButtonDeleteItem />
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
