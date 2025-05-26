'use client'

import { memo, useCallback, useState, type FC } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

interface Props {
    title: string;
    message: string;
    children: React.ReactNode;
    action: () => Promise<{ result: boolean, message: string }>;
}

export const AlertModal: FC<Props> = memo(({ title, message, children, action }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(async () => {
        setIsLoading(true);
        const { result, message } = await action();
        setIsLoading(false);

        if (result) {
            showSuccessToast({ title: message });
            setOpen(false);
        }
        else showErrorToast({ title: message });

    }, [action]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                { children }
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{ title }</DialogTitle>
                    <DialogDescription>
                        { message } 
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-2 justify-end">
                    <Button onClick={handleClick}>
                        { isLoading ? "En proceso" : "Aceptar" }
                        { isLoading && <Loader2 className="w-4 h-4 animate-spin"/> }              
                    </Button>
                    
                    <DialogClose variant="outline">
                        Cancelar
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
})