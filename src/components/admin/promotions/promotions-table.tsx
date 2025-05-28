import { Trash2 } from "lucide-react";
import { getPromotions } from "@/actions/promotions/get-promotions";
import { deletePromotion } from "@/actions/promotions/delete-promotion";
import { AlertModal } from "@/components/global/AlertModal";
import { ErrorSection } from "@/components/global/ErrorSection";
import { PromotionCard } from "@/components/admin/promotions/promotion-card";
import { PromotionChoice } from "@/components/admin/promotions/promotions-choice";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableCaption } from "@/components/ui/table";
import type { IFilters } from "@/interfaces/components";

const columns = ["Promoción", "Porciento", "Tipo", "Precio Minimo", "Precio Máximo", "Opciones"];

export async function PromotionsTable({ limit, page, search }: IFilters) {
    // Se carga el listado de promociones desde el Backend según los filtros activos.
    const promotions = await getPromotions({ limit, page, search });

    // Mensajes de en la UI según el error que ocurra.
    if (promotions.count === 0 && search && search.length !== 0)
        return <ErrorSection variant="search"/>

    if (promotions.count === 0 && !search)
        return <ErrorSection variant="data"/>
    
    if (!promotions.result || !promotions.count) 
        return <ErrorSection variant="error"/>

    return (
        <>
            {/* Listado de promociones para dispositivos moviles */}
            <ul className="flex flex-col gap-5 lg:hidden">
                {promotions.data.map((promo) => (
                    <PromotionCard key={promo.id} promotion={promo}/>
                ))}
            </ul>

            {/* Tabla de promociones para dispositivos de escritorio */}
            <Table>
                <TableCaption>
                    Se mostraron <b>{ limit > promotions.count ? promotions.count : limit } </b> 
                    promociones de <b>{promotions.count}</b> en total 
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        {columns.map((colum, index) => (
                            <TableHead key={index}>{ colum }</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { promotions.data.map(({ id, name, choice, percentage, max_price, min_price }) => (
                        <TableRow key={id} className="lg:border-b-1 lg:border-gray-200 lg:bg-white">
                            <TableCell>
                                <span className="line-clamp-1">
                                    {name}
                                </span>
                            </TableCell>
                            <TableCell>
                                {percentage} %
                            </TableCell>
                            <TableCell>
                                <PromotionChoice choice={choice}/>
                            </TableCell>
                            <TableCell>
                                {min_price !== "0.00" ? `$ ${min_price}` : "-"}
                            </TableCell>
                            <TableCell>
                                {max_price !== "0.00" ? `$ ${max_price}` : "-"}
                            </TableCell>
                            <TableCell>
                                <AlertModal
                                    title="Eliminar Promoción" 
                                    message={`Deseas eliminar la promoción ${name} de la plataforma`} 
                                    action={deletePromotion.bind(null, id)} 
                                >
                                    <Button type="button" variant="outline" size="icon">
                                        <Trash2 size={24}/>
                                    </Button>
                                </AlertModal>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                        
            {/* Componente para la paginación de los productos */}
            <Pagination 
                limit={limit} 
                currentPage={page} 
                count={promotions.count!} 
                className="hidden md:flex"
            />
        </>
    )
}
