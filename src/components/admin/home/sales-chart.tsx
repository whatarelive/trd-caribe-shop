import { getSalesSummary } from "@/actions/analytics/get-sales-sumary";
import { generateYAxis } from "@/lib/utils";
import { ErrorSection } from "@/components/global/ErrorSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export async function SalesChart() {
    const { data, result } = await getSalesSummary();

    if (!result || !data) {
        return (
            <ErrorSection 
                variant="data" 
                className="h-full py-24"
            />
        ) 
    }

    const { yAxisLabels, topLabel } = generateYAxis(data);

    return (
        <Card className="shadow-md grow w-full">
            <CardHeader>
                <CardTitle>Gráfica de Ventas</CardTitle>
                <CardDescription>
                    Resumen de ganancias de ventas en los últimos 12 meses del año.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="w-full md:col-span-4">
                    <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
                        <div className="mb-6 hidden flex-col justify-between h-[280px] text-sm text-gray-400 sm:flex">
                            { yAxisLabels.map((label) => <p key={label}>{label}</p> )}
                        </div>

                        {data?.map((sale) => (
                            <div key={sale.month} className="flex flex-col items-center gap-2">
                                <div 
                                    className="w-full rounded-md bg-blue-300"
                                    style={{ height: `${(280 / topLabel) * sale.total}px` }}
                                />

                                <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                                    {sale.month.slice(0,3)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
