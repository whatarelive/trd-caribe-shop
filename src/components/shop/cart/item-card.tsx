import { DollarSign, Minus, Plus, Trash2 } from "lucide-react";
import { addCart } from "@/actions/cart/add-cart";
import { removeFromCart } from "@/actions/cart/remove-cart";
import { removeQuantity } from "@/actions/cart/remove-quantity";
import { AlertModal } from "@/components/global/AlertModal";
import { DataSection } from "@/components/admin/data-section";
import { QuantityProductForm } from "@/components/shop/cart/quantity-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CartItemClient } from "@/interfaces/models/cart.interace";


export function ItemCard({ item }: { item: CartItemClient }) {
    const { product, quantity, subtotal } = item;
    const discount = ((product.price - product.finalPrice) / product.price) * 100;

    return (
        <Card className="shadow-md justify-between h-fit">
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle className="line-clamp-2 lg:text-lg xl:text-xl">
                        {product.name} x {quantity}
                    </CardTitle>
                    
                    {product.price > product.finalPrice && (
                        <CardDescription className="text-xs text-green-600 md:text-base">
                            {discount.toFixed(0)} % descuento
                        </CardDescription>
                    )}
                </div>
            </CardHeader>

            <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <DataSection 
                    label="Precio por unidad:"
                    value={`$ ${product.price.toFixed(2)}`}
                    icon={<DollarSign size={16} className="text-red-500"/>}
                />
                
                <DataSection 
                    label="Precio con descuento :"
                    value={`$ ${product.finalPrice.toFixed(2)}`}
                    icon={<DollarSign size={16} className="text-green-500"/>}
                />

                <DataSection 
                    label="Valor total :"
                    value={`$ ${subtotal.toFixed(2)}`}
                    icon={<DollarSign size={16} className="text-blue-500"/>}
                />
            </CardContent>

            <CardFooter className="gap-1.5 sm:gap-3 justify-end sm:items-center">
                <QuantityProductForm
                    id={item.product.id}
                    title="Aumentar cantidad"
                    description={`Deseas aumentar la cantidad de unidades del producto ${item.product.name}`}
                    action={addCart}
                >
                    <Button className="grow sm:grow-0">
                        <Plus size={18}/>
                        <span className="hidden sm:block">Agregar</span>
                    </Button>
                </QuantityProductForm>

                {quantity > 1 && (
                    <QuantityProductForm
                        id={item.product.id}
                        title="Disminuir cantidad"
                        description={`Deseas disminuir la cantidad de unidades del producto ${item.product.name}`}
                        action={removeQuantity}
                    >
                        <Button variant="outline" className="grow sm:grow-0">
                            <Minus size={18}/>
                            <span className="hidden sm:block">Disminuir</span>
                        </Button>
                    </QuantityProductForm>
                )}

                <AlertModal 
                        action={removeFromCart.bind(null, product.id)} 
                        title="Eliminar del carrito" 
                        message={`Deseas eliminar del carrito de compras el producto ${product.name}`}
                    >
                        <Button 
                            variant="outline"
                            className="grow sm:grow-0 hover:bg-red-500 hover:text-white hover:border-red-500"
                        >
                            <Trash2 size={18} />
                            <span className="hidden sm:block">Eliminar</span>
                        </Button>
                    </AlertModal>
            </CardFooter>
        </Card>
    )
}
