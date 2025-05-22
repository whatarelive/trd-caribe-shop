import Link from "next/link";
import { MdOutlineInfo } from "react-icons/md";
import { ButtonDeleteItem } from "@/components/admin/buttons";
import { DataSection } from "@/components/admin/sales/sales-utils";
import { UserNameView } from "@/components/admin/users/users-utils";
import { ComplaintState } from "@/components/admin/complaints-suggestions/complaints-utils";

import type { FC } from "react";
import type { IComplaintsAndSuggestions } from "@/interfaces/models/complaints-suggestions.interface";

export const ComplaintsCard: FC<{ suggestion: IComplaintsAndSuggestions }> = ({ suggestion }) => {
    return (
        <li className="flex flex-col p-4 gap-3 bg-white rounded-md">
            <div className="flex flex-col min-[390px]:flex-row gap-2 justify-between">
                <UserNameView value={suggestion.user}/>
                <ComplaintState active={suggestion.active}/>
            </div>

            <hr className="text-gray-300"/>

            <div className="flex justify-between">
                <DataSection 
                    label="Creado:" 
                    className="flex-col"
                    value={suggestion.created} 
                />
                
                <DataSection 
                    label="Resuelto:" 
                    className="flex-col"
                    value={suggestion.upate.length === 0 ? "--/--/--" : suggestion.upate} 
                />
            </div>

            <p className="line-clamp-5 text-wrap">
                { suggestion.text }
            </p>
            
            <div className="flex gap-4">
                <Link 
                    href={`/admin/complaints-suggestions/${suggestion.id}`} 
                    className="button-primary-v3 grow"
                >
                    <MdOutlineInfo size={20}/>
                    Detalles
                </Link>

                <ButtonDeleteItem className="flex grow items-center justify-center gap-1.5 border bg-white">
                    Eliminar
                </ButtonDeleteItem>
            </div>
        </li>
    )
}
