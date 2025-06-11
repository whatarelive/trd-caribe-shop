import { notFound } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { getSaleInfo } from "@/actions/sales/get-sale-info";
import { SaleStatus } from "@/components/global/SaleStatus";
import { SaleMethod } from "@/components/global/SaleMethod";
import { SaleItemCard } from "@/components/shop/sales/sales-item-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { IPage } from "@/interfaces/components";


export default async function SaleDetails({ params }: IPage) {
    const { id } = await params;

    if (!id) notFound();

    const { data, result } = await getSaleInfo(Number(id));

    if (!result || !data) notFound();

    const totalSavings = data.items.reduce((sum, item) => {
        return sum + (item.product.price - item.product.finalPrice) * item.quantity;
    }, 0);

    return (
        <section className="container mx-auto my-12 p-6">
            <div className="mb-6">            
                <h2 className="text-xl font-medium lg:text-3xl">
                    Detalles de la venta
                </h2>

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                        { label: "Ventas", destiny: "/admin/sales" },
                    ]} 
                    final="Detalles"
                />
            </div>

            <section className="flex flex-col gap-6 lg:flex-row">
                <Card className="grow h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <ShoppingBag className="w-5 h-5" />

                            <span>
                                Productos ({ data.items.length })
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {data.items.map((item, index) => (
                                <SaleItemCard key={index} item={item}/>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <section className="w-full space-y-6 lg:max-w-98">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información de la Orden</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between mb-3">
                                <span>Cliente</span>
                                <span>{data.user}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col text-sm">
                                    <span className="text-gray-600">
                                        Método de Pago
                                    </span>

                                    <SaleMethod method={data.method} />
                                </div>
                                
                                <SaleStatus status={data.status} className="h-fit"/>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Resumen de la Orden</CardTitle>
                        </CardHeader>     
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                    Subtotal:
                                </span>
                                <span>${data.total}</span>
                            </div>

                            {totalSavings > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Descuentos:</span>
                                    <span>-${totalSavings}</span>
                                </div>
                            )}

                            <hr />

                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total:</span>
                                <span>${data.total}</span>
                            </div>

                            {totalSavings > 0 && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                                    <span className="text-green-800 font-semibold">
                                        ¡Ahorraste ${totalSavings}!
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </section>
            </section>
        </section>
    )
}
