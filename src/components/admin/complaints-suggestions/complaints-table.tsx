import { getComplaints } from "@/actions/complaints-suggestions/get-complaints-suggestions";
import { format } from "@/lib/format-date";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Pagination } from "@/components/ui/pagination";
import { ErrorSection } from "@/components/global/ErrorSection";
import { ComplaintsCard } from "@/components/admin/complaints-suggestions/complaints-card";
import { TextCommentDialog } from "@/components/admin/complaints-suggestions/text-comment-dialog";
import { CreateResponseForm } from "@/components/admin/complaints-suggestions/create-response-form";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableCaption } from "@/components/ui/table";
import type { IFilters } from "@/interfaces/components";

const columns = ["Usuario", "Estado", "Fecha de Creación", "Fecha de Respuesta", "Opciones"];

export async function ComplaintsTable({ limit, page, search, ordering }: IFilters) {
    // Se carga el listado de comentarios desde el Backend según los filtros activos.
    const complaints = await getComplaints({ limit, page, search, ordering });

    // Mensajes de en la UI según el error que ocurra.
    if (complaints.count === 0 && search && search.length !== 0)
        return <ErrorSection variant="search"/>

    if (complaints.count === 0 && !search)
        return <ErrorSection variant="data"/>
    
    if (!complaints.result || !complaints.count) 
        return <ErrorSection variant="error"/>

    return (
        <>
            {/* Listado de quejas y sugerencias para dispositivos moviles */}
            <ul className="flex flex-col gap-5 lg:hidden">
                {complaints.data.map((complaint) => (
                    <ComplaintsCard key={complaint.id} complaint={complaint}/>
                ))}
            </ul>

            {/* Tabla de quejas y sugerencias para dispositivos de escritorio */}
            <Table>
                <TableCaption>
                    Se mostraron <b>{ limit > complaints.count ? complaints.count : limit } </b> 
                    comentarios de <b>{complaints.count}</b> en total 
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHead key={index}>{column}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {complaints.data.map(({id, text, active, created, upate, user}) => (
                        <TableRow key={id} className="lg:border-b-1 lg:border-gray-200 lg:bg-white">
                            <TableCell>
                                <div className="inline-flex gap-2 items-center">
                                    <Avatar>{user.slice(0, 2)}</Avatar>                            
                                    <span className="line-clamp-1">{user}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={active ? "destructive" : "success"}>
                                    {active ? "No resuelta" : "Resuelta"}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {format(created)}
                            </TableCell>    
                            <TableCell>
                                {active ? "-- / -- / --" : format(upate)}
                            </TableCell>
                            <TableCell>
                                <div className="inline-flex gap-2">
                                    <TextCommentDialog text={text} user={user} />
                                    <CreateResponseForm user={user} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                        
            {/* Componente para la paginación de las quejas y sugerencias */}
            <Pagination 
                limit={limit} 
                currentPage={page} 
                count={complaints.count} 
                className="hidden md:flex"
            />
        </>
    )
}
