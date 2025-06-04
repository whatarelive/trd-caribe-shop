import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export function StatisticsSkeleton({ cant }: { cant: number }) {
    return (
        <div className="flex flex-col md:flex-wrap md:flex-row gap-6">
            {Array.from({ length: cant }).map((_, index) => (
                <div key={index} className="flex flex-col grow bg-white rounded-md p-4 shadow-md">
                    <div className="flex items-center gap-6 justify-between">
                        <span className="skeleton w-32 h-4"/>
                        <span className="skeleton w-6 h-6"/>
                    </div>
                    
                    <div>
                        <span className="skeleton w-14 h-8"/>
                    </div>
                </div>
            ))}
        </div>
    )
}


export function LastCommentsSkeleton({ cant }: { cant: number }) {
    return (
        <Card className="shadow-md grow md:min-w-md">
            <CardHeader>
                <CardTitle>Comentarios Recientes</CardTitle>
                <CardDescription>
                    Listado con los comentarios públicados recientemente en la plataforma este mes.
                </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
                <ul className="space-y-4">
                    {Array.from({ length: cant }).map((_, index) => (
                        <li key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="inline-flex items-center gap-2">
                                    <span className="w-9 h-9 animate-pulse flex rounded-full bg-neutral-200"/>
                                    <span className="skeleton w-16 h-5"/>
                                </div>
                                <span className="skeleton w-20 h-4"/>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="skeleton w-full h-3"/>
                                <span className="skeleton w-full h-3"/>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter>
                <span className="skeleton w-full h-9"/>
            </CardFooter>
        </Card>
    )
}


export function LastUsersSkeleton({ cant }: { cant: number }) {
    return (
        <Card className="shadow-md grow md:min-w-md">
            <CardHeader>
                <CardTitle>Usuarios Recientes</CardTitle>
                <CardDescription>
                    Listado con los usuarios registrados recientemente en la plataforma este mes.
                </CardDescription>
            </CardHeader>

            <CardContent className="h-full">
                <ul className="space-y-4">
                    {Array.from({ length: cant }).map((_, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2 justify-start">
                                <span className="w-9 h-9 animate-pulse flex rounded-full bg-neutral-200"/>
                                
                                <div className="flex flex-col gap-0.5">
                                    <span className="skeleton w-44 h-4"/>
                                    <span className="skeleton w-32 h-3"/>
                                </div>
                            </div>

                            <span className="skeleton w-16 h-7"/>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter>
                <span className="skeleton w-full h-9"/>
            </CardFooter>        
        </Card>
    )
}


export function SalesChartSkeleton() {
    return (
        <Card className="shadow-md grow xl:min-w-[550px] xl:min-h-[455px]">
            <CardHeader>
                <CardTitle>Gráfica de Ventas</CardTitle>
                <CardDescription>
                    Resumen de ganancias de ventas en los últimos 12 meses del año.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex justify-center h-full items-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-400"/>
            </CardContent>
        </Card>
    )
}
