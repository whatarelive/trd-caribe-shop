import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";
import { MdArrowDownward, MdArrowUpward, MdDeleteOutline, MdOutlineCompareArrows, MdOutlineEdit } from "react-icons/md";
import { PromotionChoice } from "@/utils/enums";
import type { IPromotions } from "@/interfaces/models/promotions.interface";

interface Props {
    promotion: IPromotions;
}

interface PriceSectionProps {
    label: string; 
    value: number | string;
}

const PriceSection: FC<PriceSectionProps> = ({ label, value }) => {
    return (
        <div className="flex flex-col gap-1">
            <h4>{ label }</h4>
            <b>{ value }</b>
        </div>
    )
}  

export const PromotionCard: FC<Props> = ({ promotion }) => {
    return (
        <li className="flex flex-col p-4 gap-2 bg-white rounded-md">
            <h3 className="font-semibold">
                { promotion.name }
            </h3>

            <hr className="text-gray-300"/>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-6">
                <div className="flex grow justify-between items-center sm:justify-around">
                    <PriceSection label="Porcentage" value={`${promotion.porcentage} %`}/>

                    <span 
                        className={clsx(
                            "inline-flex gap-2 items-center font-medium",
                            {
                                "text-red-500" : promotion.choice === "less",
                                "text-green-500" : promotion.choice === "greater",
                                "text-blue-500" : promotion.choice === "between",
                            }
                        )}
                    >              
                        { promotion.choice === "greater" && <MdArrowUpward size={18}/> }
                        { promotion.choice === "less" && <MdArrowDownward size={18}/> }
                        { promotion.choice === "between" && <MdOutlineCompareArrows size={20}/> }

                        { PromotionChoice[promotion.choice] }
                    </span>
                </div>

                <div className="flex grow justify-between items-center sm:justify-around">
                    <PriceSection 
                        label="Valor Minimo" 
                        value={ promotion.min_price ? `$ ${promotion.min_price}` : "-" }
                    />
                    
                    <PriceSection 
                        label="Valor Máximo" 
                        value={ promotion.max_price ? `$ ${promotion.max_price}` : "-" }
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <Link 
                    href={`/admin/promotions/${promotion.id}`} 
                    className="flex items-center justify-center gap-2 w-full p-2 rounded-md bg-blue-400 text-white hover:bg-blue-500"
                >
                    <MdOutlineEdit size={20}/>
                    Editar
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
