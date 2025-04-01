import clsx from "clsx";
import type { FC } from "react";
import { MdDeleteOutline, MdOutlineInfo, MdPersonOutline } from "react-icons/md";
import type { IComplaintsAndSuggestions } from "@/interfaces/models/complaints-suggestions.interface";
import Link from "next/link";

interface Props {
    suggestion: IComplaintsAndSuggestions;
}

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

export const ComplaintsCard: FC<Props> = ({ suggestion }) => {
    return (
        <li className="flex flex-col p-4 gap-3 bg-white rounded-md">
            <div className="inline-flex justify-between">
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

            <p className="line-clamp-5 text-wrap">
                { suggestion.text }
            </p>

            
            <div className="flex gap-4">
                <Link 
                    href={`/admin/complaints-suggestions/${suggestion.id}`} 
                    className="flex items-center justify-center gap-2 w-full p-2 rounded-md bg-blue-400 text-white hover:bg-blue-500"
                >
                    <MdOutlineInfo size={20}/>
                    Detalles
                </Link>

                <button 
                    className="flex items-center justify-center gap-1 w-full p-2 rounded-md border border-neutral-500 hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer"
                >
                    <MdDeleteOutline size={20}/>
                    Eliminar
                </button>
            </div>
        </li>
    )
}
