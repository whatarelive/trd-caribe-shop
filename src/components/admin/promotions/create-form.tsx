'use client'

import { useActionState, useState } from "react";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";


export function CreatePromotionForm() {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<string>("between");

    const [_state, formAction, isPending] = useActionState(
        async (_prev: void | null, formData: FormData) => {

        }, 
        null
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-11">
                    <Plus size={24}/>
                    Crear Promoción
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Promoción</DialogTitle>
                    <DialogDescription>
                        Ingrese los datos para crear una nueva promoción para los productos
                    </DialogDescription>
                </DialogHeader>

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
                        <Label htmlFor="porcentage">Porciento de descuento</Label>
                        <Input
                            id="porcentage" 
                            type="text" 
                            name="porcentage" 
                            placeholder="Ingrese el porciento de descuento"
                        />
                    </div>
                    <div className="space-y-2 mb-4">
                        <Label htmlFor="type">Tipo de Promoción</Label>
                        <Select name="type" defaultValue={type} onValueChange={setType}>
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
                        { 
                            type !== "less" && (
                                <div className="space-y-2 mb-4 grow">
                                    <Label htmlFor="min_value">Valor minimo</Label>
                                    <Input
                                        id="min_value" 
                                        type="number"
                                        min={0} 
                                        name="min_value" 
                                        placeholder="Ingrese el valor minimo"
                                    />
                                </div>
                            )
                        }
                        {
                            type !== "greater" && (
                                <div className="space-y-2 mb-4 grow">
                                    <Label htmlFor="max_value">Valor máximo</Label>
                                    <Input
                                        id="max_value" 
                                        type="number"
                                        min={0} 
                                        name="max_value" 
                                        placeholder="Ingrese el valor máximo"
                                    />
                                </div>
                            )
                        }
                    </div>

                    <DialogFooter className="flex flex-col md:flex-row mt-4">
                        <Button type="submit" disabled={isPending}>
                            { isPending ? "Guardando..." : 'Crear Promoción' }
                        </Button>

                        <DialogClose variant="outline">
                            Cancelar
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
