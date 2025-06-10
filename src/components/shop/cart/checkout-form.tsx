'use client'

import { useActionState, useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { checkoutCartSale } from "@/actions/cart/checkout-cart";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as Modal from "@/components/ui/dialog";


export function CheckoutSaleForm() {
    const [open, setOpen] = useState(false);

    const [_state, formAction, isPending] = useActionState(
        async (_prev: void | null, formData: FormData) => {
            const { result, message } = await checkoutCartSale(formData);

            if (result)showSuccessToast({ title: message });
            else showErrorToast({ title: message });
            
            setOpen(false);
        }, 
        null
    );

    return (
         <Modal.Dialog open={open} onOpenChange={setOpen}>
            <Modal.DialogTrigger asChild>
                <Button className="w-full">
                    <CreditCard size={24}/>
                    Completar compra
                </Button>
            </Modal.DialogTrigger>

            <Modal.DialogContent>
                <Modal.DialogHeader>
                    <Modal.DialogTitle>
                        Confirmación de la compra
                    </Modal.DialogTitle>
                    <Modal.DialogDescription>
                        Ingrese su método de pago preferido para completar los detalles de la compra.
                    </Modal.DialogDescription>
                </Modal.DialogHeader>

                <form action={formAction}>
                    <div className="space-y-2 mb-12">
                        <Label htmlFor="method">Método de Pago</Label>

                        <Select name="method">
                            <SelectTrigger className="w-full bg-transparent">
                                <SelectValue placeholder="Seleccionar Método" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CREDIT_CARD">Tarjeta Crédito</SelectItem>
                                <SelectItem value="DEBIT_CARD">Tarjeta Debito</SelectItem>
                                <SelectItem value="PAYPAL">Paypal</SelectItem>
                                <SelectItem value="STRIPE">Stripe</SelectItem>
                                <SelectItem value="APPLE_PAY">Apple Pay</SelectItem>
                                <SelectItem value="GOOGLE_PAY">Google Pay</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Modal.DialogFooter className="flex flex-col md:flex-row mt-4">
                        <Button type="submit" disabled={isPending}>
                            { isPending ? "Guardando" : "Confirmar" }
                            { isPending && <Loader2 className="w-4 h-4 ml-1 animate-spin"/> }              
                        </Button>

                        <Modal.DialogClose variant="outline">
                            Cancelar
                        </Modal.DialogClose>
                    </Modal.DialogFooter>
                </form>
            </Modal.DialogContent>
        </Modal.Dialog>
    )
}
