import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ComplaintCardSkeleton() {
    return (
        <Card className="shadow-md">
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-gray-900">
                    <span className="skeleton h-8 w-32"/>
                </CardTitle>

                <span className="skeleton w-24 h-6"/>
            </CardHeader>
            
            <CardContent className="flex gap-3 flex-col sm:flex-row justify-between">
                {/* Fecha de creación */}
                <span className="skeleton h-14 w-full"/>
                {/* Fecha de respuesta */}
                <span className="skeleton h-12 w-full"/>
            </CardContent>
            <CardFooter className="flex gap-2">
                <span className="skeleton h-11 w-full rounded-md" />
                <span className="skeleton h-11 w-full rounded-md" />
            </CardFooter>
        </Card>
    )
}
