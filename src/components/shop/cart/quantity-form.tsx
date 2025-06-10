'use client'

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import * as Modal from "@/components/ui/dialog";

interface Props {
    children?: React.ReactNode;
    id: number;
    title: string;
    description: string;
    action: ({ id, quantity }: { id: number, quantity: number}) => Promise<{ result: boolean, message: string }>;
}

export function QuantityProductForm({ children, id, title, description, action }: Props) {
    const [open, setOpen] = useState(false);

    const [_state, formAction, isPending] = useActionState(
        async (_prev: void | null, formData: FormData) => {
            const quantity = Number(formData.get("quantity") ?? 1);

            const { result, message } = await action({ id, quantity });

            if (result)showSuccessToast({ title: message });
            else showErrorToast({ title: message });
            
            setOpen(false);
        }, 
        null
    );

    return (
         <Modal.Dialog open={open} onOpenChange={setOpen}>
            <Modal.DialogTrigger asChild>
               { children }
            </Modal.DialogTrigger>

            <Modal.DialogContent>
                <Modal.DialogHeader>
                    <Modal.DialogTitle>
                        { title }
                    </Modal.DialogTitle>
                    <Modal.DialogDescription>
                        { description }
                    </Modal.DialogDescription>
                </Modal.DialogHeader>

                <form action={formAction}>
                    <div className="space-y-2 mb-12">
                        <Label htmlFor="quantity">Cantidad</Label>
                        <Input
                            id="quantity"
                            name="quantity"
                            min={1}
                            placeholder="Ingrese la nueva cantidad"
                            className=""
                        />
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
