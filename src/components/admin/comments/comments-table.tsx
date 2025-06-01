import { getComments } from "@/actions/comments/get-comments";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Pagination } from "@/components/ui/pagination";
import { ErrorSection } from "@/components/global/ErrorSection";
import { CommentsCard } from "@/components/admin/comments/comments-card";
import { TextCommentDialog } from "@/components/admin/comments/text-comment-dialog";
import { CreateResponseForm } from "@/components/admin/comments/create-response-form";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableCaption } from "@/components/ui/table";
import type { IFilters } from "@/interfaces/components";

const columns = ["Usuario", "Estado", "Fecha de Creación", "Fecha de Respuesta", "Opciones"];

export async function CommentsTable({ limit, page, search, ordering }: IFilters) {
    // Se carga el listado de comentarios desde el Backend según los filtros activos.
    const comments = await getComments({ limit, page, search, ordering });

    // Mensajes de en la UI según el error que ocurra.
    if (comments.count === 0 && search && search.length !== 0)
        return <ErrorSection variant="search"/>

    if (comments.count === 0 && !search)
        return <ErrorSection variant="data"/>
    
    if (!comments.result || !comments.count) 
        return <ErrorSection variant="error"/>

    return (
        <>
            {/* Listado de comentarios para dispositivos moviles */}
            <ul className="flex flex-col gap-5 lg:hidden">
                {comments.data.map((comment) => (
                    <CommentsCard key={comment.id} comment={comment}/>
                ))}
            </ul>

            {/* Tabla de comentarios para dispositivos de escritorio */}
            <Table>
                <TableCaption>
                    Se mostraron <b>{ limit > comments.count ? comments.count : limit } </b> 
                    comentarios de <b>{comments.count}</b> en total 
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHead key={index}>{column}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {comments.data.map(({id, text, active, created, update, user}) => (
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
                                {created}
                            </TableCell>    
                            <TableCell>
                                {update}
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
                        
            {/* Componente para la paginación de los comentarios */}
            <Pagination 
                limit={limit} 
                currentPage={page} 
                count={comments.count} 
                className="hidden md:flex"
            />
        </>
    )
}
