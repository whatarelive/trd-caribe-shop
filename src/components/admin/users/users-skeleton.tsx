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
                                <span className="skeleton h-4 w-32" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-4 w-16" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-4 w-40" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-4 w-20 rounded-md" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-8 w-8 rounded-md" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Skeleton para la paginación */}
            <div className="hidden md:flex items-center justify-between">
                <span className="skeleton h-4 w-32" />
                
                <div className="flex items-center space-x-2">
                    <span className="skeleton h-8 w-8" />
                    <span className="skeleton h-8 w-8" />
                    <span className="skeleton h-8 w-8" />
                    <span className="skeleton h-8 w-8" />
                    <span className="skeleton h-8 w-8" />
                </div>

                <span className="skeleton h-4 w-24" />
            </div>
        </div>
    )
}
