import clsx from "clsx";
import Link from "next/link";
import { MdDeleteOutline, MdOutlineInfo } from "react-icons/md";
import { Pagination } from "@/components/ui/pagination/pagination";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ComplaintsCard } from "@/components/admin/complaints-suggestions/complaints-card";
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
                        <TableHead className="max-w-16">
                            Usuario
                        </TableHead>
                        <TableHead className="max-w-60">
                            Comentario
                        </TableHead>
                        <TableHead className="max-w-12 px-6">
                            Estado
                        </TableHead>
                        <TableHead className="max-w-12">
                            Fecha de Creación
                        </TableHead>
                        <TableHead className="max-w-12">
                            Fecha de Respuesta
                        </TableHead>
                        <TableHead className="max-w-12">
                            Opciones
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { suggestions.map((suggestion) => (
                        <TableRow key={ suggestion.id } className="lg:border-b-2 lg:border-gray-200 lg:bg-white">
                            <TableCell>
                                <span className="line-clamp-1 text-wrap">
                                    { suggestion.user }
                                </span>
                            </TableCell>
                                
                            <TableCell>
                                <span className="line-clamp-2">
                                    { suggestion.text }
                                </span>
                            </TableCell>

                            <TableCell className="px-6">
                                <span 
                                    className={clsx(
                                        "border p-1.5 rounded-sm",
                                        {
                                            "bg-green-100 border-green-500 text-green-500" : suggestion.active,
                                            "bg-red-100 border-red-500 text-red-500" : !suggestion.active,
                                        }
                                    )}
                                >
                                    { suggestion.active ? "Resuelta" : "No resuelta" }
                                </span>
                            </TableCell>

                            <TableCell>
                                { suggestion.created }
                            </TableCell>    
                            
                            <TableCell>
                                { suggestion.upate.length === 0 ? "--/--/--" : suggestion.upate }
                            </TableCell>

                            <TableCell>
                                <div className="inline-flex items-center gap-4">
                                    <Link 
                                        href={`/admin/complaints-suggestions/${suggestion.id}`} 
                                        className="p-2 rounded-md border border-neutral-500 hover:bg-blue-400 hover:text-white hover:border-blue-400"
                                    >
                                        <MdOutlineInfo size={20}/>
                                    </Link>

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
                        
            {/* Componente para la paginación de las quejas y sugerencias */}
            <Pagination totalPages={8} className="hidden md:flex"/>
        </>
    )
}
