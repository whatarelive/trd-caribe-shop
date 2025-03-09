import type { FC } from "react";

//Props del componente SelectCategories
interface Props {
    label: string;
    name: string;
    categories: {
        id: number;
        name: string;
    }[];
}

/**
 * Componente que renderiza un campo de selección de categorías.
 * Permite al usuario seleccionar una categoría de una lista predefinida.
 */
export const SelectCategories: FC<Props> = ({ label, name, categories }) => {
    return (
        <div className="input-container">
            {/* Etiqueta del campo de selección */}
            <label htmlFor={name} className="text-neutral-600 text-sm font-semibold mb-1 select-none">
                { label }
            </label>

            {/* Contenedor del campo de selección */}
            <div className="input-subcontainer">
                {/* Campo select con las opciones de categorías */}
                <select 
                    id={name} 
                    name={name} 
                    defaultValue={""} 
                    className="h-10 w-full border-0 outline-none text-sm"
                >
                    {/* Opción por defecto */}
                    <option value="" disabled>
                        Seleccione una categoría
                    </option>

                    {/* Mapeo de las categorías disponibles */}
                    {
                        categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}
