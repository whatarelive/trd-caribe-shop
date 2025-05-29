'use client'

import { useActionState, useState } from "react";
import { Send } from "lucide-react";
import { createComplaints } from "@/actions/complaints-suggestions/create-complaints-suggestions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import * as Modal from "@/components/ui/dialog";


export function ComplaintsCreateForm() {
    const [open, setOpen] = useState(false);

    const [_state, formAction, isPending] = useActionState(
        async (_prev: null | void, formData: FormData) => {
            const { result, message } = await createComplaints(formData);

            if (result) showSuccessToast({ title: message });
            else showErrorToast({ title: message });

            setOpen(false);
        }, 
        null
    )

    return (
        <Modal.Dialog open={open} onOpenChange={setOpen}>
            <Modal.DialogTrigger asChild>
                <Button>
                    <Send size={24}/>
                    Publicar Comentario
                </Button>
            </Modal.DialogTrigger>
            <Modal.DialogContent>
                <Modal.DialogHeader>
                    <Modal.DialogTitle>
                        Haz tu comentario
                    </Modal.DialogTitle>
                    <Modal.DialogDescription>
                        Danos una comentario como cliente fiel sobre nuestros productos
                    </Modal.DialogDescription>
                </Modal.DialogHeader>

                <form action={formAction}>
                    <Textarea 
                        id="text" 
                        name="text" 
                        placeholder="El mensaje no puede ser mayor de 200 carácteres..."
                        className="min-h-32"
                    />

                    <Modal.DialogFooter className="flex flex-col md:flex-row mt-4">
                        <Button type="submit" disabled={isPending}>
                            { isPending ? "Enviando..." : "Enviar" }
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