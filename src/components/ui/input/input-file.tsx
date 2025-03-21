"use client";	

import { type FC, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import type { ITextInput } from "@/interfaces/components";

/**
 * Componente de entrada para archivos de imagen
 * Incluye un botón personalizado y una vista previa del nombre del archivo seleccionado
 * @param label - Etiqueta que se muestra encima del campo de entrada
 * @param name - Nombre del campo de entrada, usado para identificación
 */
export const FileInput: FC<Pick<ITextInput, 'label'| 'name'>> = ({ label, name }) => {
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
                <input type="file" ref={inputRef} onChange={handleChange} accept="image/*" className="hidden" name={name} />
            </div>
        </div>    
    )
}
