'use client'

import { useActionState, useState } from "react";
import { ImageDown, Loader2 } from "lucide-react";
import { updateImage } from "@/actions/products/update-image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import * as Modal from "@/components/ui/dialog";


export function ChangeImageModal({ id }: { id: number }) {
    const [open, setOpen] = useState(false);

    const [_state, formAction, isPending] = useActionState(
        async (_prev: null | void, formData: FormData) => {
            const { result, message } = await updateImage(id, formData); 

            if (result) showSuccessToast({ title: message });
            else showErrorToast({ title: message });

            setOpen(false);
        },
        null
    );

    return (
        <Modal.Dialog open={open} onOpenChange={setOpen}>
            <Modal.DialogTrigger asChild className="mt-4">
                <Button variant="outline">
                    <ImageDown size={24}/>
                    <span>Cambiar Imagen</span>
                </Button>
            </Modal.DialogTrigger>
            <Modal.DialogContent>
                <Modal.DialogHeader>
                    <Modal.DialogTitle>
                        Cambiar Imagen
                    </Modal.DialogTitle>
                    <Modal.DialogDescription>
                       Deseas cambiar la imagen actual del producto seleccionado
                    </Modal.DialogDescription>
                </Modal.DialogHeader>

                <form action={formAction}>
                    <Input 
                        id="image" 
                        name="image" 
                        type="file" 
                        accept="image/*"  
                    />

                    <Modal.DialogFooter className="flex flex-col md:flex-row mt-4">
                        <Button type="submit" disabled={isPending}>
                            { isPending ? "Guardando" : "Cambiar" }
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
