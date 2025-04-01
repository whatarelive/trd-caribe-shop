import clsx from "clsx";
import { MdDeleteOutline, MdOutlinePublishedWithChanges } from "react-icons/md";
import { Pagination } from "@/components/ui/pagination/pagination";
import { UserCard } from "@/components/admin/users/user-card";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table"
import { users } from "@/lib/data/users";

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
            <Table className="hidden lg:bg-gray-50 p-4 lg:table lg:table-fixed lg:border-spacing-6 lg:border-8 lg:border-gray-50">
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
                    { users.map((user) => (
                        <TableRow key={ user.id } className="lg:border-b-2 lg:border-gray-200 lg:bg-white">
                            <TableCell>
                                <span className="line-clamp-1">
                                    { `${user.first_name} ${user.last_name}` }
                                </span>
                            </TableCell>
                                
                            <TableCell>
                                <span className="line-clamp-1">
                                    { user.username }
                                </span>
                            </TableCell>

                            <TableCell>
                                <span className="line-clamp-1">
                                    { user.email }
                                </span>
                            </TableCell>

                            <TableCell>
                                <span 
                                    className={clsx(
                                        "p-1.5 rounded-md font-medium", 
                                        { 
                                            "bg-green-100 text-green-500" : user.is_staff, 
                                            "bg-red-100 text-red-500" : !user.is_staff 
                                        }
                                    )}
                                >
                                    { user.is_staff ? "administrador" : "cliente" }
                                </span>
                            </TableCell>    
                            
                            <TableCell>
                                <div className="inline-flex items-center gap-4">
                                    <button 
                                        className={clsx(
                                            "p-2 rounded-md border border-neutral-500 cursor-pointer hover:text-white",
                                            {
                                                "hover:bg-red-400 hover:border-red-400": user.is_staff,
                                                "hover:bg-green-400 hover:border-green-400": !user.is_staff 
                                            }
                                        )}
                                    >
                                        <MdOutlinePublishedWithChanges size={20}/>
                                    </button>

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
