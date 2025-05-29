import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PromotionCardSkeleton() {
    return (
        <Card className="shadow-md">
            <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                        <span className="skeleton h-8 w-32"/>
                    </CardTitle>

                    <span className="skeleton w-24 h-6"/>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Información principal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <span className="skeleton h-14 w-full"/>
                    <span className="skeleton h-12 w-full"/>
                    <span className="skeleton h-12 w-full"/>
                </div>

                {/* Valores mínimo y máximo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <span className="skeleton h-14 w-full"/>
                    <span className="skeleton h-14 w-full"/>
                </div>

                {/* Botón de acción */}
                <div className="pt-4">
                    <span className="skeleton h-11 w-full rounded-md" />
                </div>
            </CardContent>
        </Card>
    )
}
