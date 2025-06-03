'use client'

import { useActionState, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { createCategorie } from "@/actions/categories/create-categorie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import * as Modal from "@/components/ui/dialog";


export function CreateCategorieForm() {
    const [open, setOpen] = useState(false);

    const [_state, formAction, isPending] = useActionState(
        async (_prev: void | null, formData: FormData) => {
            const { result, message } = await createCategorie(formData);

            if (result)showSuccessToast({ title: message });
            else showErrorToast({ title: message });
            
            setOpen(false);
        }, 
        null
    );

    return (
         <Modal.Dialog open={open} onOpenChange={setOpen}>
            <Modal.DialogTrigger asChild>
                <Button className="h-11 w-full">
                    <Plus size={24}/>
                    Crear Categoría
                </Button>
            </Modal.DialogTrigger>

            <Modal.DialogContent>
                <Modal.DialogHeader>
                    <Modal.DialogTitle>
                        Crear Categoría
                    </Modal.DialogTitle>
                    <Modal.DialogDescription>
                        Ingrese los datos para crear una nueva categoría para los productos
                    </Modal.DialogDescription>
                </Modal.DialogHeader>

                <form action={formAction} className="mt-3">
                    <div className="space-y-2 mb-4">
                        <Label htmlFor="name">Nombre de la categoría</Label>
                        <Input
                            id="name" 
                            type="text" 
                            name="name" 
                            placeholder="Ingrese el nombre de la categoría"
                        />
                    </div>

                    <Modal.DialogFooter className="flex flex-col md:flex-row mt-4">
                        <Button type="submit" disabled={isPending}>
                            { isPending ? "Guardando" : "Crear Categoría" }
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
