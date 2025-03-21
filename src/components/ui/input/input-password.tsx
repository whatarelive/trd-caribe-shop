"use client";

import clsx from "clsx";
import { type FC, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import type { ITextInput } from "@/interfaces/components";

/**
 * Componente de entrada de texto para contraseñas
 * Incluye un botón para mostrar/ocultar la contraseña
 * @param label - Etiqueta que se muestra encima del campo de entrada
 * @param errors - Array de errores para mostrar debajo del campo
 * @param icon - Icono opcional que se muestra al inicio del campo
 * @param props - Propiedades adicionales del input HTML
 */
export const TextInputWithPassword: FC<ITextInput> = ({ label, errors, icon, ...props }) => {
    // Estado para controlar la visibilidad de la contraseña
    const [view, setView] = useState(false);
    const Icon = icon;

    // Función para alternar la visibilidad de la contraseña
    const handleClick = () => setView(!view);

    return (
        <div className="input-container">
            {/* Etiqueta del campo */}
            <label htmlFor={props.name} className="text-neutral-600 text-sm font-semibold mb-1 select-none">
                { label }
            </label>

            <div className={clsx(
                "input-subcontainer border border-neutral-300", 
                { "border-red-500" : errors }
            )}>
                {/* Renderiza el icono si existe */}
                { Icon && <Icon size={20} className={clsx("text-black", { "text-red-500" : errors })}/> }

                {/* Campo de entrada de contraseña */}
                <input 
                    id={props.name} { ...props } 
                    className="w-full p-2 border-0 text-sm bg-transparent outline-none"
                    type={ view ? "text" : "password" }    
                />

                {/* Botón para mostrar/ocultar contraseña */}
                { 
                    view 
                        ? <MdOutlineVisibility 
                            size={20} 
                            onClick={handleClick} 
                            className={clsx(
                                "text-black cursor-pointer", 
                                { "text-red-500" : errors }
                            )}
                        /> 
                        : <MdOutlineVisibilityOff 
                            size={20} 
                            onClick={handleClick} 
                            className={clsx(
                                "text-black cursor-pointer", 
                                { "text-red-500" : errors }
                            )}
                        /> 
                }
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