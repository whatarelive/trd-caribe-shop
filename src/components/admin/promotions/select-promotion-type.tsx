import clsx from "clsx";
import { DetailedHTMLProps, FC, SelectHTMLAttributes } from "react";

//Props del componente SelectPromotionType
interface Props extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label: string;
    errors?: string[];
}

const types = [
    { value: "between", label: "Entre" },
    { value: "greater", label: "Mayor que" },
    { value: "less", label: "Menor que" },
]

export const SelectPromotionType: FC<Props> = ({ label, errors, ...props }) => {
    const Children = props.children;

    const promotionsTypes = Children 
        ? types.filter((t) => t.value !== props.defaultValue) 
        : types;

    return (
        <div className="input-container">
            {/* Etiqueta del campo de selección */}
            <label htmlFor="promo-choice" className="text-neutral-600 text-sm font-semibold mb-1 select-none">
                { label }
            </label>

            {/* Contenedor del campo de selección */}
            <div className={clsx(
                "input-subcontainer border border-neutral-300", 
                { "border-red-500" : errors }
            )}>
                {/* Campo select con las opciones de tipo de promociones */}
                <select 
                    id="promo-choice" 
                    name="choice"
                    onFocus={props.onFocus}
                    className="h-10 w-full border-0 outline-none text-sm"
                    { ...props }
                >
                    {/* Opción por defecto */}
                    {
                        /* Si se encuentra en la pantalla de informacion de la promoción se pone 
                        el tipo de esa promoción como opción por defecto */ 
                    }
                    { Children && Children }

                    {/* Mapeo de los tipos disponibles */}
                    {
                        promotionsTypes.map((element) => (
                            <option key={element.value} value={element.value}>
                                {element.label}
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
