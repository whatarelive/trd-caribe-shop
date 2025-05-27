'use client'

import { useActionState, useState } from "react";
import { Plus } from "lucide-react";
import { createPromotion } from "@/actions/promotions/create-promotion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import * as Modal from "@/components/ui/dialog";


export function CreatePromotionForm() {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<string>("between");

    const [_state, formAction, isPending] = useActionState(
        async (_prev: void | null, formData: FormData) => {
            const { result, message } = await createPromotion(formData);

            if (result) showSuccessToast({ title: message });
            else showErrorToast({ title: message });
            
            setOpen(false);
        }, 
        null
    );

    return (
        <Modal.Dialog open={open} onOpenChange={setOpen}>
            <Modal.DialogTrigger asChild>
                <Button className="h-11">
                    <Plus size={24}/>
                    Crear Promoción
                </Button>
            </Modal.DialogTrigger>

            <Modal.DialogContent>
                <Modal.DialogHeader>
                    <Modal.DialogTitle>
                        Crear Promoción
                    </Modal.DialogTitle>
                    <Modal.DialogDescription>
                        Ingrese los datos para crear una nueva promoción para los productos
                    </Modal.DialogDescription>
                </Modal.DialogHeader>

                <form action={formAction} className="mt-3">
                    <div className="space-y-2 mb-4">
                        <Label htmlFor="name">Nombre de la promoción</Label>
                        <Input
                            id="name" 
                            type="text" 
                            name="name" 
                            placeholder="Ingrese el nombre de promoción"
                        />
                    </div>
                    <div className="space-y-2 mb-4">
                        <Label htmlFor="percentage">Porciento de descuento</Label>
                        <Input
                            id="percentage" 
                            type="text" 
                            name="percentage" 
                            placeholder="Ingrese el porciento de descuento"
                        />
                    </div>
                    <div className="space-y-2 mb-4">
                        <Label htmlFor="choice">Tipo de Promoción</Label>
                        <Select name="choice" defaultValue={type} onValueChange={setType}>
                            <SelectTrigger className="w-full bg-transparent">
                                <SelectValue placeholder="Seleccionar tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="between">Entre</SelectItem>
                                <SelectItem value="greater">Mayor que</SelectItem>
                                <SelectItem value="less">Menor que</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col md:flex-row gap-x-4">
                        <div className={`space-y-2 mb-4 grow ${ type === "greater" ? "hidden" : "block" }`}>
                            <Label htmlFor="min_price">Valor minimo</Label>
                            <Input
                                id="min_price" 
                                type="number"
                                min={0}
                                name="min_price" 
                                placeholder="Ingrese el valor minimo"
                            />
                        </div>
                
                        <div className={`space-y-2 mb-4 grow ${ type === "less" ? "hidden" : "block" }`}>
                            <Label htmlFor="max_price">Valor máximo</Label>
                            <Input
                                id="max_price" 
                                type="number"
                                min={0} 
                                name="max_price" 
                                placeholder="Ingrese el valor máximo"
                            />
                        </div>
                    </div>

                    <Modal.DialogFooter className="flex flex-col md:flex-row mt-4">
                        <Button type="submit" disabled={isPending}>
                            { isPending ? "Guardando..." : 'Crear Promoción' }
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
