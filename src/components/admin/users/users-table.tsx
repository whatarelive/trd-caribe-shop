import { RotateCcwKey, Shield, Users } from "lucide-react";
import { getUsers } from "@/actions/users/get-users";
import { updateUserRole } from "@/actions/users/update-user-role";
import { AlertModal } from "@/components/global/AlertModal";
import { ErrorSection } from "@/components/global/ErrorSection";
import { UserCard } from "@/components/admin/users/user-card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableCaption } from "@/components/ui/table";
import type { IFilters } from "@/interfaces/components";


export async function UsersTable({ page, limit, search, ordering }: IFilters) {
    // Se carga el listado de usuarios desde el Backend según los filtros activos.
    const users = await getUsers({ page, limit, search, ordering });
    
    // Mensajes de en la UI según el error que ocurra.
    if (users.count === 0 && search && search.length !== 0) 
        return <ErrorSection variant="search"/>
    
    if (users.count === 0 && !search) 
        return <ErrorSection variant="data"/>
    
    if (!users.result || !users.count) 
        return <ErrorSection variant="error"/>
    
    return (
        <>
            {/* Listado de usuarios para dispositivos moviles */}
            <ul className="flex flex-col gap-5 lg:hidden">
                {users.data.map((user) => (
                    <UserCard
                        key={user.id} 
                        user={user}
                    />
                ))}
            </ul>

            {/* Tabla de usuarios para dispositivos de escritorio */}
            <Table>
                <TableCaption>
                    Se mostraron <b>{ limit > users.count ? users.count : limit } </b> 
                    usuarios de <b>{users.count}</b> en total 
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Nombre y Apellidos
                        </TableHead>
                        <TableHead className="w-20">
                            Usuario
                        </TableHead>
                        <TableHead>
                            Correo electrónico
                        </TableHead>
                        <TableHead className="w-16">
                            Nivel de Permisos
                        </TableHead>
                        <TableHead className="w-16">
                            Opciones
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { users.data.map(({id, email, first_name, last_name, username, is_staff}) => (
                        <TableRow key={id} className="lg:bg-white lg:border-b-1 lg:border-gray-200">
                            <TableCell>
                                <div className="inline-flex gap-2 items-center">
                                    <Avatar>{first_name.slice(0, 2)}</Avatar>
                            
                                    <span className="line-clamp-1">
                                        { `${first_name} ${last_name}` }
                                    </span>
                                </div>
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
                                <Badge 
                                    className="inline-flex gap-1 items-center" 
                                    variant={is_staff ? "success" : "destructive"}
                                >
                                    {is_staff ? (
                                        <>
                                            <Shield className="h-3 w-3" />
                                            Administrador
                                        </>
                                    ) : (
                                        <>
                                            <Users className="h-3 w-3" />
                                            Cliente
                                        </>
                                    )}
                                </Badge>
                            </TableCell>                           
                            <TableCell>
                                <AlertModal
                                    title="Cambio de Rol" 
                                    message={`Desesa cambiar el rol de ${is_staff ? "administrador" : "cliente"} al usuario ${username}`} 
                                    action={updateUserRole.bind(null, id, username)} 
                                >
                                    <Button type="button" variant="outline" size="icon">
                                        <RotateCcwKey size={24}/>
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
                count={users.count}
                className="hidden md:flex"
            />
        </>
    )
}
