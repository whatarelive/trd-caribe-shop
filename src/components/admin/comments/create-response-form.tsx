'use client'

import { useActionState, useState } from "react";
import { Send } from "lucide-react";
import { createResponseComments } from "@/actions/comments/create-response-comments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import * as Modal from "@/components/ui/dialog";


export function CreateResponseForm({ user }: { user: string }) {
    const [open, setOpen] = useState(false);

    const [_state, formAction, isPending] = useActionState(
        async (_prev: null | void, formData: FormData) => {
            formData.append("username", user);

            const { result, message } = await createResponseComments(formData); 

            if (result) showSuccessToast({ title: message });
            else showErrorToast({ title: message });

            setOpen(false);
        },
        null
    );

    return (
        <Modal.Dialog open={open} onOpenChange={setOpen}>
            <Modal.DialogTrigger asChild className="grow">
                <Button variant="outline">
                    <Send size={24}/>
                    <span className="md:hidden">Responder</span>
                </Button>
            </Modal.DialogTrigger>
            <Modal.DialogContent>
                <Modal.DialogHeader>
                    <Modal.DialogTitle>
                        Responder Comentario
                    </Modal.DialogTitle>
                    <Modal.DialogDescription>
                        Enviar mensaje de respuesta para el comentario del usuario: {user}
                    </Modal.DialogDescription>
                </Modal.DialogHeader>

                <form id="response_comment" action={formAction}>
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
