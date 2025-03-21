"use client";

import { useActionState } from "react";
import { MdOutlineLock, MdOutlinePerson2, MdOutlineLockClock, MdOutlineEmail } from "react-icons/md";
import { useFormError } from "@/lib/hooks/useFormError";
import { createUser } from "@/actions/auth/register";
import { TextInput } from "@/components/ui/input/input-text";
import { TextInputWithPassword } from "@/components/ui/input/input-password";
import type { RegisterState } from "@/interfaces/models/user.interface";

/**
 * @description Componente de formulario del lado del cliente para registro de usuarios que maneja:
 * @summary
 * - Validación de datos de entrada
 * - Estado del envío del formulario
 * - Visualización de errores
 * - Diseño responsivo
 */
export const RegisterForm = () => {
    // Inicializa el estado del formulario con mensaje y errores vacíos
    const initialState: RegisterState = { errors: {} };
    // Utiliza una acción del servidor para el envío del formulario y seguimiento del estado de carga
    const [errorMessage, formAction, isPending] = useActionState(createUser, initialState);
    // Control de la visibilidad de los errores del formulario
    const { showErrors, handleFocus } = useFormError({ errors: errorMessage.errors });

    return (
        <form action={formAction} className="flex flex-col mt-6">
            {/* Sección de Información Personal - Cuadrícula Responsiva */}
            <div className="flex flex-col md:flex-row md:gap-3">
                {/* Campo de Nombre */}
                <TextInput
                    label="Nombre"
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="Ingrese el nombre"
                    aria-describedby="first_name-error"
                    onFocus={handleFocus}
                    errors={showErrors ? errorMessage.errors?.first_name : undefined}
                />

                {/* Campo de Apellidos */}
                <TextInput
                    label="Apellidos"
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Ingrese los apellidos"
                    aria-describedby="last_name-error"
                    onFocus={handleFocus}
                    errors={showErrors ? errorMessage.errors?.last_name : undefined}
                />
            </div>

            {/* Campo de Usuario con Ícono de Persona */}
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

            {/* Campo de Correo con Ícono de Email */}
            <TextInput
                label="Correo"
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese su correo electronico"
                icon={MdOutlineEmail}
                aria-describedby="email-error"
                onFocus={handleFocus}
                errors={showErrors ? errorMessage.errors?.email : undefined}
            />

            {/* Campo de Contraseña con Ícono de Candado */}
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

            {/* Campo de Confirmación de Contraseña con Ícono de Candado y Reloj */}
            <TextInputWithPassword
                label="Confirmar Contraseña"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Confirme la contraseña"
                icon={MdOutlineLockClock}
                aria-describedby="passwordConfirm-error"
                onFocus={handleFocus}
                errors={showErrors ? errorMessage.errors?.passwordConfirm : undefined}
            />

            {/* Botón de Envío con Estado de Carga */}
            <button 
                type="submit" 
                className="button-primary mt-4"
                disabled={isPending}
            >
                {
                    isPending 
                        ? <span className="loader"></span> 
                        : 'Registrar Cuenta'
                }
            </button>
        </form>
    )
}