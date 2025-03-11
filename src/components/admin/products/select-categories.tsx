import type { DetailedHTMLProps, FC, SelectHTMLAttributes } from "react";
import { getCategories } from "@/src/lib/actions/categories";

//Props del componente SelectCategories
interface Props extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label: string;
    errors?: string[]
}

/**
 * Componente que renderiza un campo de selección de categorías.
 * Permite al usuario seleccionar una categoría de una lista predefinida.
 */
export const SelectCategories: FC<Props> = async ({ label, errors, ...props }) => {
    const data = await getCategories();

    return (
        <div className="input-container">
            {/* Etiqueta del campo de selección */}
            <label htmlFor={props.name} className="text-neutral-600 text-sm font-semibold mb-1 select-none">
                { label }
            </label>

            {/* Contenedor del campo de selección */}
            <div className="input-subcontainer">
                {/* Campo select con las opciones de categorías */}
                <select 
                    id={props.id} 
                    name={props.name} 
                    defaultValue={""}
                    className="h-10 w-full border-0 outline-none text-sm"
                    { ...props }
                >
                    {/* Opción por defecto */}
                    <option value="">
                        Seleccione una categoría
                    </option>

                    {/* Mapeo de las categorías disponibles */}
                    {
                        data && data.results.map((cat) => (
                            <option key={cat.id} value={cat.id.toString()}>
                                {cat.name}
                            </option>
                        ))
                    }
                </select>
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
