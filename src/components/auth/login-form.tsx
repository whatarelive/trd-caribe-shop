"use client";

import { useActionState, useState } from "react";
import { MdOutlinePerson2, MdOutlineLock, MdOutlineEmail, MdOutlinePublishedWithChanges } from "react-icons/md";
import { verifyUser } from "@/src/lib/actions/auth";
import { TextInput, TextInputWithPassword } from "@/src/components/ui/input";
import type { LoginState } from "@/src/types/actions-props";

/**
 * @description Componente de formulario del lado del cliente para el inicio de sesion de los usuarios.
 * @summary
 * - Validación de datos de entrada
 * - Estado del envío del formulario
 * - Visualización de errores
 * - Diseño responsivo
 */
export const LoginForm = () => {
    // Estado para controlar si se muestra el campo de correo o nombre de usuario
    const [isEmail, setIsEmail] = useState<boolean>(false);
    // Inicializa el estado del formulario con mensaje y errores vacíos
    const initialState: LoginState = { message: null, errors: {} };
    // Utiliza una acción del servidor para el envío del formulario y seguimiento del estado de carga
    const [errorMessage, formAction, isPending] = useActionState(verifyUser, initialState);

    return (
        <form action={formAction} className="flex flex-col mt-6">
            {/* Contenedor para input de usuario/correo y botón de cambio */}
            <div className="inline-flex gap-2">
                {
                    isEmail ? (
                        // Campo de correo electrónico
                        <TextInput
                            label="Correo"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Ingrese su correo electronico"
                            icon={MdOutlineEmail}
                            aria-describedby="email-error"
                            errors={errorMessage.errors?.email}
                        />
                    ) : (
                        // Campo de nombre de usuario
                        <TextInput
                            label="Usuario"
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Ingrese el nombre de usuario"
                            icon={MdOutlinePerson2}
                            aria-describedby="username-error"
                            errors={errorMessage.errors?.username}
                        />
                    )
                }
                
                {/* Botón para alternar entre correo y nombre de usuario */}
                <button 
                    type="button" 
                    onClick={() => setIsEmail(!isEmail)}
                    className="h-[38px] mt-6 p-2 cursor-pointer rounded-sm border border-neutral-300"
                >
                    <MdOutlinePublishedWithChanges />
                </button>
            </div>

            {/* Campo de contraseña */}
            <TextInputWithPassword
                label="Contraseña"
                id="password"
                name="password"
                placeholder="Ingrese su contraseña"
                icon={MdOutlineLock}
                aria-describedby="password-error"
                errors={errorMessage.errors?.password}
            />

            {/* Botón de envío del formulario */}
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