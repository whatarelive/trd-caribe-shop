import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { getSaleInfo } from "@/actions/sales/get-sale-info";
import { SaleStatus } from "@/components/global/SaleStatus";
import { SaleMethod } from "@/components/global/SaleMethod";
import { SaleItemCard } from "@/components/shop/sales/sales-item-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { IPage } from "@/interfaces/components";


export default async function OrderUserDetails({ params }: IPage) {
    const { id } = await params;

    if (!id) notFound();

    const { data, result } = await getSaleInfo(Number(id));

    if (!result || !data) notFound();

    const totalSavings = data.items.reduce((sum, item) => {
        return sum + (item.product.price - item.product.finalPrice) * item.quantity;
    }, 0);

    return (
        <section className="container mx-auto my-12 p-6 max-w-7xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium lg:text-3xl">
                    Detalles de la compra
                </h2>
            
                <Link 
                    href="/user/orders/" 
                    className="border inline-flex items-center gap-2 p-1 h-fit px-1.5 rounded-md hover:bg-gray-100 active:bg-gray-200"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden md:block">Regresar</span>
                </Link>
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
                        <CardContent className="flex items-center justify-between">
                            <div className="flex flex-col text-sm">
                                <span className="text-gray-600">
                                    Método de Pago
                                </span>

                                <SaleMethod method={data.method} />
                            </div>
                            
                            <SaleStatus status={data.status} className="h-fit"/>
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
