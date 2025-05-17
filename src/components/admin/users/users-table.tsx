import { ButtonDeleteItem } from "@/components/admin/buttons";
import { Pagination } from "@/components/ui/pagination";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table"
import { UserCard } from "@/components/admin/users/user-card";
import { ButtonUserChangeRole, UserNameView } from "@/components/admin/users/users-utils";
import { users } from "@/lib/data/users";
import { Badge } from "@/components/ui/badge";

export const UsersTable = () => {
    return (
        <>
            {/* Listado de usuarios para dispositivos moviles */}
            <ul className="flex flex-col gap-2 bg-gray-50 p-2 lg:hidden">
                {users.map((user) => (
                    <UserCard
                        key={user.id} 
                        user={user}
                    />
                ))}
            </ul>

            {/* Tabla de usuarios para dispositivos de escritorio */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Nombre y Apellidos
                        </TableHead>
                        <TableHead>
                            Usuario
                        </TableHead>
                        <TableHead>
                            Correo electrónico
                        </TableHead>
                        <TableHead>
                            Nivel de Permisos
                        </TableHead>
                        <TableHead>
                            Opciones
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { users.map(({id, email, first_name, last_name, username, is_staff}) => (
                        <TableRow key={id} className="lg:bg-white lg:border-b-2 lg:border-gray-200">
                            <TableCell>
                                <UserNameView value={`${first_name} ${last_name}`}/>
                            </TableCell>
                            <TableCell>
                                <span className="line-clamp-1">
                                    {username}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="line-clamp-1">
                                    {email}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Badge variant={is_staff ? "success" : "destructive"}>
                                    { is_staff ? "administrador" : "cliente" }
                                </Badge>
                            </TableCell>                           
                            <TableCell>
                                <div className="inline-flex items-center gap-4">
                                    <ButtonUserChangeRole isStaff={is_staff}/>
                                    <ButtonDeleteItem/>
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
