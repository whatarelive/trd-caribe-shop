import { PaginationSkeleton } from "@/components/admin/pagination-skeleton";
import { UserCardSkeleton } from "@/components/admin/users/user-card-skeleton";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableCaption } from "@/components/ui/table";


export function UsersSkeleton({ rows }: { rows: number }) {
    const array = Array.from({ length: rows });

    return (
        <div className="space-y-4">
            {/* Skeleton para vista mobile */}
            <ul className="flex flex-col gap-5 lg:hidden">
                {array.map((_, index) => <UserCardSkeleton key={index} />)}
            </ul>

            {/* Skeleton para vista desktop */}
            <Table>
                <TableCaption>
                    <span className="skeleton h-4 w-64 mx-auto" />
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre y Apellidos</TableHead>
                        <TableHead className="w-20">Usuario</TableHead>
                        <TableHead>Correo electrónico</TableHead>
                        <TableHead className="w-16">Nivel de Permisos</TableHead>
                        <TableHead className="w-16">Opciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {array.map((_, index) => (
                        <TableRow key={index} className="lg:bg-white lg:border-b-1 lg:border-gray-200">
                            <TableCell>
                                <span className="skeleton h-5 w-32" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-5 w-16" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-5 w-40" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-5 w-20 rounded-md" />
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
