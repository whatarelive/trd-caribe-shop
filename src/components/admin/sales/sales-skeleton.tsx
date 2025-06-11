import { PaginationSkeleton } from "@/components/admin/pagination-skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


function SaleCardSkeleton() {
    return (
        <Card className="w-full shadow-md">
            <CardHeader className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="skeleton w-9 h-9"/>
                    <span className="skeleton w-20 h-5"/>
                </div>

                <span className="skeleton w-20 h-6"/>
            </CardHeader>

            <CardContent className="h-full">
                <div className="flex justify-between md:flex-col">
                    <div className="flex flex-col justify-between text-sm mb-2 md:flex-row">
                        <span className="skeleton w-20 h-4"/>
                        <span className="skeleton w-16 h-4 mt-1"/>
                    </div>

                    <div className="flex flex-col justify-between text-sm mb-2 md:flex-row">
                        <span className="skeleton w-28 h-4"/>
                        <span className="skeleton w-24 h-4 mt-1"/>
                    </div>
                </div>

                <span className="skeleton w-full h-1"/>

                <div className="flex justify-between items-center mt-6">
                    <span className="skeleton w-14 h-6"/>
                    <span className="skeleton w-20 h-6"/>
                </div>
            </CardContent>

            <CardFooter>
                <span className="skeleton w-full h-9"/>
            </CardFooter>
        </Card>
    )
}


export function SalesTableSkeleton({ rows }: { rows: number }) {
    const array = Array.from({ length: rows });

    return (
         <>
            <ul className="flex flex-col gap-5 lg:hidden w-full">
                {array.map((_, index) => (
                    <SaleCardSkeleton key={index}/>
                ))}
            </ul>

            <Table>
                <TableCaption>
                    <span className="skeleton h-4 w-64 mx-auto" />
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Monto Total</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Método de pago</TableHead>
                        <TableHead>Opciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {array.map((_, index) => (
                        <TableRow key={index} className="lg:bg-white lg:border-b-1 lg:border-gray-200">
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <span className="animate-pulse bg-neutral-200 flex rounded-full h-8 w-8" />
                                    <span className="skeleton h-5 w-32" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-5 w-12" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-8 w-24" />
                            </TableCell>
                            <TableCell>
                                <span className="skeleton h-7 w-36" />
                            </TableCell>    
                            <TableCell>
                                <span className="skeleton h-9 w-20" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                
            <PaginationSkeleton/>
        </>
    )
}
