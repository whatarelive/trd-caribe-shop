import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { ButtonDeleteItem } from "@/components/admin/buttons";
import { DataSection } from "@/components/admin/sales/sales-utils";
import { PromotionChoice } from "@/components/admin/promotions/promotions-utils";

import type { FC } from "react";
import type { IPromotions } from "@/interfaces/models/promotions.interface";


export const PromotionCard: FC<{ promotion: IPromotions }> = ({ promotion }) => {
    return (
        <li className="flex flex-col p-4 gap-2 bg-white rounded-md">
            <h3 className="font-semibold">
                { promotion.name }
            </h3>

            <hr className="text-gray-300"/>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-6">
                <div className="flex grow justify-between items-center sm:justify-around">
                    <DataSection 
                        label="Porcentage"
                        className="flex-col"  
                        value={`${promotion.porcentage} %`}
                    />
                    <PromotionChoice choice={promotion.choice}/>
                </div>

                <div className="flex grow justify-between items-center sm:justify-around">
                    <DataSection 
                        label="Valor Minimo" 
                        className="flex-col"
                        value={ promotion.min_price ? `$ ${promotion.min_price}` : "-" }
                    />
                    
                    <DataSection 
                        label="Valor Máximo"
                        className="flex-col"
                        value={ promotion.max_price ? `$ ${promotion.max_price}` : "-" }
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <Link 
                    href={`/admin/promotions/${promotion.id}`} 
                    className="button-primary-v3 grow items-center"
                >
                    <MdOutlineEdit size={20}/>
                    Editar
                </Link>

                <ButtonDeleteItem className="flex grow justify-center items-center bg-white text-black border">
                    Eliminar
                </ButtonDeleteItem>
            </div>
        </li>
    )
}
