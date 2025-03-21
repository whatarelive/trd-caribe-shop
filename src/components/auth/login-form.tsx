"use client";

import { useActionState } from "react";
import { MdOutlinePerson2, MdOutlineLock } from "react-icons/md";
import { useFormError } from "@/lib/hooks/useFormError";
import { autheticate } from "@/actions/auth/login";
import { TextInput } from "@/components/ui/input/input-text";
import { TextInputWithPassword } from "@/components/ui/input/input-password";
import type { LoginState } from "@/interfaces/models/user.interface";

/**
 * @description Componente de formulario del lado del cliente para el inicio de sesion de los usuarios.
 * @summary
 * - Validación de datos de entrada
 * - Estado del envío del formulario
 * - Visualización de errores
 * - Diseño responsivo
 */
export const LoginForm = () => {
    // Inicializa el estado del formulario con mensaje y errores vacíos
    const initialState: LoginState = { errors: {} };
    // Utiliza una acción del servidor para el envío del formulario y seguimiento del estado de carga
    const [errorMessage, formAction, isPending] = useActionState(autheticate, initialState);
    // Control de la visibilidad de los errores del formulario
    const { showErrors, handleFocus } = useFormError({ errors: errorMessage.errors });

    return (
        <form action={formAction} className="flex flex-col mt-6">
            {/* Campo de nombre de usuario */}
            <TextInput
                label="Usuario"
                id="username"
                name="username"
                type="text"
                placeholder="Ingrese el nombre de usuario"
                icon={MdOutlinePerson2}
                aria-describedby="username-error"
                onFocus={handleFocus}
                errors={showErrors ? errorMessage.errors?.username : undefined}
            />
           
            {/* Campo de contraseña */}
            <TextInputWithPassword
                label="Contraseña"
                id="password"
                name="password"
                placeholder="Ingrese su contraseña"
                icon={MdOutlineLock}
                aria-describedby="password-error"
                onFocus={handleFocus}
                errors={showErrors ? errorMessage.errors?.password : undefined}
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