import { PaginationSkeleton } from "@/components/admin/pagination-skeleton";
import { PromotionCardSkeleton } from "@/components/admin/promotions/promotion-card-skeleton";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableCaption } from "@/components/ui/table";


export function PromotionsSkeleton({ rows }: { rows: number }) {
    const array = Array.from({ length: rows });

    return (
        <div className="space-y-4">
            {/* Skeleton para vista mobile */}
            <ul className="flex flex-col gap-5 lg:hidden">
                {array.map((_, index) => <PromotionCardSkeleton key={index} />)}
            </ul>

            {/* Skeleton para vista desktop */}
            <Table>
                <TableCaption>
                    <span className="skeleton h-4 w-64 mx-auto" />
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Promoción</TableHead>
                        <TableHead>Porciento</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Precio Minimo</TableHead>
                        <TableHead>Precio Máximo</TableHead>
                        <TableHead>Opciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {array.map((_, index) => (
                        <TableRow key={index} className="lg:bg-white lg:border-b-1 lg:border-gray-200">
                            <TableCell>
                                <span className="skeleton h-5 w-24" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-5 w-16" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-5 w-20" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-5 w-16" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-5 w-16" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-9 w-9 rounded-md" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Skeleton para la paginación */}
            <PaginationSkeleton/>
        </div>
    )
}
