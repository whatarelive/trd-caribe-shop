import clsx from "clsx";
import type { FC } from "react";
import { MdPersonOutline } from "react-icons/md";
import { fontText } from "@/config/fonts";
import { suggestions } from "@/lib/data/suggestions";

const suggestion = suggestions[1];

interface PriceSectionProps {
    label: string; 
    value: number | string;
}

const DataSection: FC<PriceSectionProps> = ({ label, value }) => {
    return (
        <div className="flex flex-col gap-1">
            <h4>{ label }</h4>
            <b>{ value }</b>
        </div>
    )
}  

export const ComplaintsDetail = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Sección de contenido */}
            <div className="p-4 min-h-72 space-y-2 bg-gray-50 rounded-md md:space-y-4 lg:w-4/6">
                <h2 className="text-lg font-medium">
                    Comentario del Usuario
                </h2>

                <p className={`${fontText.className} text-sm bg-white p-4 rounded-md md:text-base`}>
                    { suggestion.text }
                </p>
            </div>
            
            {/* Seección de detalles */}
            <div className="flex flex-col p-4 gap-4 h-fit bg-gray-50 rounded-md lg:w-2/6">
                <div className="flex gap-4 justify-between">
                    <div className="inline-flex items-center gap-2">
                        <MdPersonOutline size={24}/>

                        <h3 className="text-lg line-clamp-1">
                            { suggestion.user }
                        </h3>
                    </div>

                    <span 
                        className={clsx(
                            "border p-1 px-1.5 rounded-sm",
                            {
                                "bg-green-100 border-green-500 text-green-500" : suggestion.active,
                                "bg-red-100 border-red-500 text-red-500" : !suggestion.active,
                            }
                        )}
                    >
                        { suggestion.active ? "Resuelta" : "No resuelta" }
                    </span>
                </div>

                <hr className="text-gray-300"/>

                <div className="flex justify-between">
                    <DataSection label="Creado:" value={suggestion.created}/>
                    <DataSection label="Resuelto:" value={suggestion.upate.length === 0 ? "--/--/--" : suggestion.upate}/>
                </div>

                {
                    !suggestion.active && (
                        <button 
                            className="button-primary h-11"
                        >
                            Resolver Comentario
                        </button>
                    )
                }
            </div>
        </div>
    )
}
