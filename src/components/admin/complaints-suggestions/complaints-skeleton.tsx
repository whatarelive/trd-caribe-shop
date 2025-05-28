import { PaginationSkeleton } from "@/components/admin/pagination-skeleton";
import { ComplaintCardSkeleton } from "@/components/admin/complaints-suggestions/complainst-card-skeleton";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableCaption } from "@/components/ui/table";


export function ComplaintsSkeleton({ rows }: { rows: number }) {
    const array = Array.from({ length: rows });

    return (
        <div className="space-y-4">
            {/* Skeleton para vista mobile */}
            <ul className="flex flex-col gap-5 lg:hidden">
                {array.map((_, index) => <ComplaintCardSkeleton key={index} />)}
            </ul>

            {/* Skeleton para vista desktop */}
            <Table>
                <TableCaption>
                    <span className="skeleton h-4 w-64 mx-auto" />
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha de Creación</TableHead>
                        <TableHead>Fecha de Respuesta</TableHead>
                        <TableHead>Opciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {array.map((_, index) => (
                        <TableRow key={index} className="lg:bg-white lg:border-b-1 lg:border-gray-200">
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="skeleton h-8 w-8 rounded-full"/>
                                    <span className="skeleton h-5 w-24" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-5 w-20" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-5 w-28" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-5 w-28" />
                            </TableCell>
                            <TableCell>
                                <div className="inline-flex gap-2">
                                    <span className="skeleton h-10 w-10 rounded-md" />
                                    <span className="skeleton h-10 w-10 rounded-md" />
                                </div>
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
