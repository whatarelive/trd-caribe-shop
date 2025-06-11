'use client'

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import * as Modal from "@/components/ui/dialog";

interface Props {
    id?: number;
    title: string;
    description: string;
    children?: React.ReactNode; 
    action: (formData: FormData, id?: number) => Promise<{
        result: boolean;
        message: string;
    }>;
}

export function CommentsForm({ id, title, description, children, action }: Props) {
    const [open, setOpen] = useState(false);

    const [_state, formAction, isPending] = useActionState(
        async (_prev: null | void, formData: FormData) => {
            const { result, message } = await action(formData, id);

            if (result) showSuccessToast({ title: message });
            else showErrorToast({ title: message });

            setOpen(false);
        }, 
        null
    )

    return (
        <Modal.Dialog open={open} onOpenChange={setOpen}>
            <Modal.DialogTrigger asChild>{ children }</Modal.DialogTrigger>
            <Modal.DialogContent>
                <Modal.DialogHeader>
                    <Modal.DialogTitle>{ title }</Modal.DialogTitle>
                    <Modal.DialogDescription>{ description }</Modal.DialogDescription>
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
                            { isPending ? "Enviando" : "Enviar" }
                            { isPending && <Loader2 className="w-4 h-4 animate-spin"/> }              
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