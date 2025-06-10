import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { getCart } from "@/actions/cart/get-cart";
import { ItemCard } from "@/components/shop/cart/item-card";
import { CheckoutSaleForm } from "@/components/shop/cart/checkout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export default async function ShoppingCartPage() {
    const { result, data } = await getCart();

    if (!result || !data || data.items.length === 0) {
        return (
            <section className="flex items-center justify-center h-full">
                <div className="text-center">
                    <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    
                    <h2 className="text-xl font-semibold mb-2">
                        Tu carrito está vacío
                    </h2>

                    <p className="text-muted-foreground mb-6">
                        Parece que aún no has añadido productos a tu carrito
                    </p>
                    
                    <Button asChild>
                        <Link href="/">Explorar Productos</Link>
                    </Button>
                </div>
            </section>
        )
    }

    let saving: number = 0;

    for (const item of data.items) {
        saving += ((item.product.price - item.product.finalPrice) * item.quantity);
    }

    return (
        <section className="container mx-auto px-6 my-12 xl:px-0">
            <div className="flex justify-between">
                <h1 className="text-xl font-medium mb-8 lg:text-2xl xl:text-3xl">
                    Tu Carrito de Compras
                </h1>

                <Link href="/" className="border inline-flex items-center gap-1 p-1 h-fit px-1.5 rounded-md active:bg-gray-200">
                    <ArrowLeft size={16}/>
                    <span className="hidden sm:block">Regresar</span>
                </Link>
            </div>

            <h2 className="font-semibold text-muted-foreground mb-4 lg:text-lg xl:text-xl">
                Productos ({data?.items.length})
            </h2>

            <section className="relative flex flex-col-reverse gap-6 lg:flex-row">
                <ul className="grow">
                    {data.items.map((item) => (
                        <li key={item.id} className="mb-6">
                            <ItemCard item={item}/>
                        </li>
                    ))}
                </ul>

                <section className="lg:sticky lg:top-[100px] h-fit">
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle className="md:text-xl">
                                Resumen del Pedido
                            </CardTitle>
                        </CardHeader>
                        
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between text-green-600">
                                    <span className="text-sm md:text-base">
                                        Ahorro
                                    </span>
                                    <span className="text-sm md:text-base">
                                        $ {saving}
                                    </span>
                                </div>

                                <hr />

                                <div className="flex justify-between font-semibold md:pt-2">
                                    <span className="text-sm md:text-base">
                                        Total
                                    </span>
                                    <span className="text-sm md:text-base">
                                        ${data?.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4">
                            <CheckoutSaleForm/>

                            <div className="text-xs text-center text-muted-foreground">
                                Los impuestos y gastos de envío se calcularán en el siguiente paso
                            </div>
                        </CardFooter>
                    </Card>
                </section>
            </section>
        </section>
    )
}
