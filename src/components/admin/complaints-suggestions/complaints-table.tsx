import Link from "next/link";
import { MdOutlineInfo } from "react-icons/md";
import { ButtonDeleteItem } from "@/components/admin/buttons";
import { Pagination } from "@/components/ui/pagination/pagination";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { UserNameView } from "@/components/admin/users/users-utils";
import { ComplaintsCard } from "@/components/admin/complaints-suggestions/complaints-card";
import { ComplaintState } from "@/components/admin/complaints-suggestions/complaints-utils";
import { suggestions } from "@/lib/data/suggestions";

export const ComplaintsAndSuggestionsTable = () => {
    return (
        <>
            {/* Listado de quejas y sugerencias para dispositivos moviles */}
            <ul className="flex flex-col gap-2 bg-gray-50 p-2 lg:hidden">
                {suggestions.map((suggestion) => (
                    <ComplaintsCard
                        key={suggestion.id}
                        suggestion={suggestion}
                    />
                ))}
            </ul>

            {/* Tabla de quejas y sugerencias para dispositivos de escritorio */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Usuario
                        </TableHead>
                        <TableHead>
                            Estado
                        </TableHead>
                        <TableHead>
                            Fecha de Creación
                        </TableHead>
                        <TableHead>
                            Fecha de Respuesta
                        </TableHead>
                        <TableHead>
                            Opciones
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { suggestions.map(({id, active, created, upate, user}) => (
                        <TableRow key={ id } className="lg:border-b-2 lg:border-gray-200 lg:bg-white">
                            <TableCell>
                                <UserNameView value={user}/>
                            </TableCell>
                            <TableCell className="">
                               <ComplaintState active={active}/>
                            </TableCell>
                            <TableCell>
                                { created }
                            </TableCell>    
                            <TableCell>
                                { upate.length === 0 ? "--/--/--" : upate }
                            </TableCell>
                            <TableCell>
                                <div className="inline-flex items-center gap-4">
                                    <Link href={`/admin/complaints-suggestions/${id}`} className="button-primary-v2">
                                        <MdOutlineInfo size={20}/>
                                    </Link>

                                    <ButtonDeleteItem/>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                        
            {/* Componente para la paginación de las quejas y sugerencias */}
            <Pagination totalPages={8} className="hidden md:flex"/>
        </>
    )
}
