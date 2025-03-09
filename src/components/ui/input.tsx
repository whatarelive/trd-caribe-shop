"use client";

import { useRef, useState, type FC } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import type { ITextInput } from "@/src/types/components";

/**
 * Componente de entrada de texto básico
 * @param label - Etiqueta que se muestra encima del campo de entrada
 * @param errors - Array de errores para mostrar debajo del campo
 * @param icon - Icono opcional que se muestra al inicio del campo
 * @param props - Propiedades adicionales del input HTML
 */
const TextInput: FC<ITextInput> = ({ label, errors, icon, ...props }) => {
    const Icon = icon;

    return (
        <div className="input-container">
            {/* Etiqueta del campo */}
            <label htmlFor={props.name} className="text-neutral-600 text-sm font-semibold mb-1 select-none">
                { label }
            </label>
    
            <div className="input-subcontainer">
                {/* Renderiza el icono si existe */}
                { Icon && <Icon size={20}/> }
                
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

/**
 * Componente de entrada de texto para contraseñas
 * Incluye un botón para mostrar/ocultar la contraseña
 * @param label - Etiqueta que se muestra encima del campo de entrada
 * @param errors - Array de errores para mostrar debajo del campo
 * @param icon - Icono opcional que se muestra al inicio del campo
 * @param props - Propiedades adicionales del input HTML
 */
const TextInputWithPassword: FC<ITextInput> = ({ label, errors, icon, ...props }) => {
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

            <div className="input-subcontainer">
                {/* Renderiza el icono si existe */}
                { Icon && <Icon size={20}/> }

                {/* Campo de entrada de contraseña */}
                <input 
                    id={props.name} { ...props } 
                    className="w-full p-2 border-0 text-sm bg-transparent outline-none"
                    type={ view ? "text" : "password" }    
                />

                {/* Botón para mostrar/ocultar contraseña */}
                { 
                    view 
                    ? <MdOutlineVisibility size={20} onClick={handleClick} className="cursor-pointer"/> 
                    : <MdOutlineVisibilityOff size={20} onClick={handleClick} className="cursor-pointer"/> 
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

/**
 * Componente de entrada para archivos de imagen
 * Incluye un botón personalizado y una vista previa del nombre del archivo seleccionado
 * @param label - Etiqueta que se muestra encima del campo de entrada
 * @param name - Nombre del campo de entrada, usado para identificación
 */
const FileInput: FC<Pick<ITextInput, 'label'| 'name'>> = ({ label, name }) => {
    // Estado para almacenar el nombre del archivo seleccionado
    const [fileName, setFileName] = useState<string | null>(null);

    // Referencia al input de archivo
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Función para manejar el clic en el botón de carga de imagen
    const handleClick = () => inputRef.current?.click();

    // Función para manejar el cambio en el input de archivo
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFileName(file ? file.name : null);
    }

    return (
        <div className="input-container">
            {/* Etiqueta del campo */}
            <label htmlFor={name} className="text-neutral-600 text-sm font-semibold mb-1 select-none">
                { label }
            </label>
    
            <div>
                {/* Boton de acción */}
                <div className="flex w-full items-center gap-2">
                    <button 
                        type="button" 
                        onClick={handleClick} 
                        className={`flex lg:min-w-40 p-2 rounded-sm border border-neutral-400 items-center gap-2 text-neutral-400 text-sm
                        cursor-pointer hover:bg-green-500 hover:text-white`}
                    >
                        
                        <IoCloudUploadOutline size={24} />
                        <span className="hidden lg:block text-sm">Cargar imagen</span>
                    </button>
                
                    <div className="p-2 h-11 w-full rounded-sm border border-neutral-400">    
                        <span className="text-sm text-neutral-400 truncate">
                            { fileName ? fileName : "Seleccione el archivo de imagen" }
                        </span>
                    </div>
                </div>
                
                {/* Campo de entrada */}
                <input type="file" ref={inputRef} onChange={handleChange} accept="image/*" className="hidden" />
            </div>
        </div>    
    )
}

export {
    TextInput,
    TextInputWithPassword,
    FileInput,
}