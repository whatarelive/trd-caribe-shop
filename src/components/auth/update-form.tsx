'use client'

import { useActionState, useState } from "react";
import { Edit, Loader2 } from "lucide-react";
import { autheticate } from "@/actions/auth/login";
import { updateUser } from "@/actions/users/update-users";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/auth/input-password";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import * as Modal from "@/components/ui/dialog";

interface Props {
    username?: string;
    email?: string;
}

export function UpdateUserForm({ username, email }: Props) {
    const [open, setOpen] = useState(false);

    const [_state, formAction, isPending] = useActionState(
        async (_prev: void | null, formData: FormData) => {
            const { result, message } = await updateUser(formData);

            if (result) {
                showSuccessToast({ title: message });
                await autheticate(formData);
            }
            else showErrorToast({ title: message });
            
            setOpen(false);
        }, 
        null
    );

    return (
         <Modal.Dialog open={open} onOpenChange={setOpen}>
            <Modal.DialogTrigger asChild>
                <Button className="grow">
                    <Edit size={24}/>
                    Editar Cuenta
                </Button>
            </Modal.DialogTrigger>

            <Modal.DialogContent>
                <Modal.DialogHeader>
                    <Modal.DialogTitle>
                        Editar Cuenta
                    </Modal.DialogTitle>
                    <Modal.DialogDescription>
                        Editar la información de la cuenta actual.
                    </Modal.DialogDescription>
                </Modal.DialogHeader>

                <form action={formAction}>
                    <div className="space-y-1 mb-4">
                        <Label htmlFor="first_name" className="text-sm font-medium">
                            Nombre
                        </Label>
                        <Input
                            id="first_name"
                            name="first_name"
                            type="text"
                            placeholder="Ingrese el nombre"
                            required
                        />
                    </div>

                    <div className="space-y-1 mb-4">
                        <Label htmlFor="last_name" className="text-sm font-medium">
                            Apellidos
                        </Label>
                        <Input
                            id="last_name"
                            name="last_name"
                            type="text"
                            placeholder="Ingrese los apellidos"
                            required
                        />
                    </div>

                    <div className="space-y-1 mb-4">
                        <Label htmlFor="username" className="text-sm font-medium">
                            Usuario
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            defaultValue={username}
                            placeholder="Ingrese el nombre de usuario"
                            required
                        />
                    </div>

                    <div className="space-y-1 mb-4">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Correo
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={email}
                            placeholder="Ingrese el correo electronico"
                            required
                        />
                    </div>

                    <div className="space-y-1 mb-4 relative">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Contraseña
                        </Label>
                        <InputPassword 
                            id="password"
                            name="password"
                            placeholder="Ingrese la contraseña"
                            className="pl-3"
                            required                    
                        />
                    </div>

                    <div className="space-y-1 mb-6 relative">
                        <Label htmlFor="passwordConfirm" className="text-sm font-medium">
                            Confirmar Contraseña
                        </Label>
                        <InputPassword 
                            id="passwordConfirm"
                            name="passwordConfirm"                            
                            placeholder="Confirme la contraseña"
                            className="pl-3"
                            required                    
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