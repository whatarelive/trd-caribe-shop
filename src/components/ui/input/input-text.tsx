"use client";

import clsx from 'clsx';
import type { FC } from 'react';
import type { ITextInput } from "@/interfaces/components";

/**
 * Componente de entrada de texto básico
 * @param label - Etiqueta que se muestra encima del campo de entrada
 * @param errors - Array de errores para mostrar debajo del campo
 * @param icon - Icono opcional que se muestra al inicio del campo
 * @param props - Propiedades adicionales del input HTML
 */
export const TextInput: FC<ITextInput> = ({ label, errors, icon, ...props }) => {
    const Icon = icon;

    return (
        <div className="input-container">
            {/* Etiqueta del campo */}
            <label htmlFor={props.name} className="text-neutral-600 text-sm font-semibold mb-1 select-none">
                { label }
            </label>
    
            <div className={clsx(
                    "input-subcontainer border border-neutral-300", 
                    { "border-red-500" : errors }
                )}
            >
                {/* Renderiza el icono si existe */}
                { Icon && <Icon size={20} className={clsx("text-black", { "text-red-500" : errors })}/> }
                
                {/* Campo de entrada */}
                <input 
                    id={props.name} 
                    autoComplete="off"
                    className="w-full p-2 border-0 text-sm bg-transparent outline-none"
                    { ...props } 
                />
            </div>
            {/* Sección de errores */}
            {
                errors && (
                    <div id={props["aria-describedby"]} aria-live="polite" aria-atomic="true">
                        {
                            <p className="text-sm text-red-500" key={errors[0]}>
                                { errors[0] }
                            </p>
                        }
                    </div>
                )
            }
        </div>
    )
}