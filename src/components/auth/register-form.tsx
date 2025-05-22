"use client"

import { redirect } from "next/navigation";
import { useActionState } from "react";
import { Lock, LockKeyhole, Mail, User } from "lucide-react";
import { createUser } from "@/actions/auth/register";
import { InputPassword } from "@/components/auth/input-password";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";


export const RegisterForm = () => {
    // Utiliza una acción del servidor para el envío del formulario y seguimiento del estado de carga
    const [_state, formAction, isPending] = useActionState(
        async (_prev: null | void, formData: FormData) => {
            const { result, message } = await createUser(formData);

            if (result) {
                showSuccessToast({ title: message });
                redirect("/");
            } 
            else showErrorToast({ title: message });
        }, 
        null
    );

    return (
        <form action={formAction} className="flex flex-col mt-6">
            <div className="flex flex-col md:flex-row md:gap-3">
                <div className="space-y-2 mb-4 grow">
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

                <div className="space-y-2 mb-4 grow">
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
            </div>

            <div className="space-y-2 mb-4">
                <Label htmlFor="username" className="text-sm font-medium">
                    Usuario
                </Label>
                <div className="relative">
                    <User className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Ingrese el nombre de usuario"
                        className="pl-10"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <Label htmlFor="email" className="text-sm font-medium">
                    Correo
                </Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Ingrese el correo electronico"
                        className="pl-10"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2 mb-6">
                <Label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                </Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
                    <InputPassword 
                        id="password"
                        name="password"
                        placeholder="Ingrese la contraseña"
                        required                    
                    />
                </div>
            </div>

            <div className="space-y-2 mb-6">
                <Label htmlFor="passwordConfirm" className="text-sm font-medium">
                    Confirmar Contraseña
                </Label>
                <div className="relative">
                    <LockKeyhole className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
                    <InputPassword 
                        id="passwordConfirm"
                        name="passwordConfirm"
                        placeholder="Confirme la contraseña"
                        required                    
                    />
                </div>
            </div>

            <Button type="submit" disabled={isPending}>
                { isPending ? "Registrando..." : "Registrar Cuenta" }
            </Button>
        </form>
    )
}