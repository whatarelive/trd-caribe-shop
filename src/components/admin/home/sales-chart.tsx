import { generateYAxis } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SaleChartData } from "@/interfaces/models/sales.interface";


export async function SalesChart() {
    const sales = await new Promise<SaleChartData[]>((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    name: "Ene",
                    total: 1800,
                    sales: 120,
                },
                {
                    name: "Feb",
                    total: 2200,
                    sales: 132,
                },
                {
                    name: "Mar",
                    total: 2800,
                    sales: 167,
                },
                {
                    name: "Abr",
                    total: 3200,
                    sales: 198,
                },
                {
                    name: "May",
                    total: 3000,
                    sales: 235,
                },
                {
                    name: "Jun",
                    total: 5500,
                    sales: 270,
                },
                {
                    name: "Jul",
                    total: 4700,
                    sales: 290,
                },
                {
                    name: "Ago",
                    total: 8200,
                    sales: 304,
                },
                {
                    name: "Sep",
                    total: 2600,
                    sales: 325,
                },
                {
                    name: "Oct",
                    total: 7100,
                    sales: 370,
                },
                {
                    name: "Nov",
                    total: 6500,
                    sales: 390,
                },
                {
                    name: "Dic",
                    total: 10000,
                    sales: 420,
                },
            ])
        }, 1000);
    });

    const { yAxisLabels, topLabel } = generateYAxis(sales);

    return (
        <Card className="shadow-md grow">
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

                        {sales.map((month) => (
                            <div key={month.sales} className="flex flex-col items-center gap-2">
                                <div 
                                    className="w-full rounded-md bg-blue-300"
                                    style={{ height: `${(280 / topLabel) * month.total}px` }}
                                />

                                <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                                    {month.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
