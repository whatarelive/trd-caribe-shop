"use client";

import { useActionState, useState } from "react";
import { MdOutlinePerson2, MdOutlineLock, MdOutlineEmail, MdOutlinePublishedWithChanges } from "react-icons/md";
import { verifyUser } from "@/src/lib/actions/auth";
import { TextInput, TextInputWithPassword } from "@/src/components/ui/input";
import type { LoginState } from "@/src/types/actions-props";

export const LoginForm = () => {
    const [isEmail, setIsEmail] = useState<boolean>(false);
    
    // Inicializa el estado del formulario con mensaje y errores vacíos
    const initialState: LoginState = { isEmail, message: null, errors: {} };

    // Utiliza una acción del servidor para el envío del formulario y seguimiento del estado de carga
    const [errorMessage, formAction, isPending] = useActionState(verifyUser, initialState);

    return (
        <form action={formAction} className="flex flex-col mt-6">
            <div className="inline-flex gap-2">
                {
                    isEmail ? (
                        <TextInput
                            label="Correo"
                            id="user"
                            name="user"
                            type="email"
                            placeholder="Ingrese su correo electronico"
                            icon={MdOutlineEmail}
                            aria-describedby="email-error"
                            errors={errorMessage.errors?.user}
                        />
                    ) : (
                        <TextInput
                            label="Usuario"
                            id="user"
                            name="user"
                            type="text"
                            placeholder="Ingrese el nombre de usuario"
                            icon={MdOutlinePerson2}
                            aria-describedby="username-error"
                            errors={errorMessage.errors?.user}
                        />
                    )
                }
                
                <button 
                    type="button" 
                    onClick={() => setIsEmail(!isEmail)}
                    className="h-[38px] mt-6 p-2 cursor-pointer rounded-sm border border-neutral-300"
                >
                    <MdOutlinePublishedWithChanges />
                </button>
            </div>

            <TextInputWithPassword
                label="Contraseña"
                id="password"
                name="password"
                placeholder="Ingrese su contraseña"
                icon={MdOutlineLock}
                aria-describedby="password-error"
                errors={errorMessage.errors?.password}
            />

            <button 
                type="submit" 
                disabled={isPending} 
                className="button-primary mt-4"
            >
                {
                    isPending 
                        ? <span className="loader"></span> 
                        : 'Iniciar sesión'
                }
            </button>
        </form>
    )
}