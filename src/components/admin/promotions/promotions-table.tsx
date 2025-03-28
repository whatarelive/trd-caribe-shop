import clsx from "clsx";
import Link from "next/link";
import { MdArrowDownward, MdArrowUpward, MdDeleteOutline, MdOutlineCompareArrows, MdOutlineEdit } from "react-icons/md";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { PromotionCard } from "@/components/admin/promotions/promotion-card";
import { Pagination } from "@/components/ui/pagination/pagination";
import { promotions } from "@/lib/data/promotions";
import { PromotionChoice } from "@/utils/enums";

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
            <Table className="hidden lg:bg-gray-50 p-4 lg:table lg:table-fixed lg:border-spacing-6 lg:border-8 lg:border-gray-50">
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
                    { promotions.map((promo) => (
                        <TableRow key={ promo.id } className="lg:border-b-2 lg:border-gray-200 lg:bg-white">
                            <TableCell>
                                <span className="line-clamp-1">
                                    { promo.name }
                                </span>
                            </TableCell>
                                
                            <TableCell>
                                { promo.porcentage } %
                            </TableCell>

                            <TableCell>
                                <span 
                                    className={clsx(
                                        "inline-flex gap-2 items-center font-medium",
                                        {
                                            "text-red-500" : promo.choice === "less",
                                            "text-green-500" : promo.choice === "greater",
                                            "text-blue-500" : promo.choice === "between",
                                        }
                                    )}
                                >              
                                    { promo.choice === "greater" && <MdArrowUpward size={18}/> }
                                    { promo.choice === "less" && <MdArrowDownward size={18}/> }
                                    { promo.choice === "between" && <MdOutlineCompareArrows size={20}/> }

                                    { PromotionChoice[promo.choice] }
                                </span>
                            </TableCell>

                            <TableCell>
                                { promo.min_price ? `$ ${promo.min_price}` : "-" }
                            </TableCell>    
                            
                            <TableCell>
                                { promo.max_price ? `$ ${promo.max_price}` : "-" }
                            </TableCell>

                            <TableCell>
                                <div className="inline-flex items-center gap-4">
                                    <Link 
                                        href={`/admin/promotions/${promo.id}`} 
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
