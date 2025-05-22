"use client";

import { redirect } from "next/navigation";
import { useActionState } from "react";
import { User, Lock } from "lucide-react";
import { autheticate } from "@/actions/auth/login";
import { InputPassword } from "@/components/auth/input-password";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";


export const LoginForm = () => {
    // Utiliza una acción del servidor para el envío del formulario y seguimiento del estado de carga
    const [_state, formAction, isPending] = useActionState(
        async (_prev: null | void, formData: FormData) => {
            const { result, message } = await autheticate(formData);

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

            <Button type="submit" disabled={isPending}>
                { isPending ? "Iniciando sesión..." : 'Iniciar sesión' }
            </Button>
        </form>
    )
}