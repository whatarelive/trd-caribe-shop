import clsx from "clsx";
import { MdArrowDownward, MdArrowUpward, MdOutlineCompareArrows } from "react-icons/md";

import type { FC } from "react";
import type { PromotionsChoice } from "@/interfaces/models/promotions.interface";

const Choices = {
    greater: "Mayor que", 
    less: "Menor que", 
    between: "Entre",
}

export const PromotionChoice: FC<{ choice: PromotionsChoice }> = ({ choice }) => {
    return (
        <span 
            className={clsx(
                "inline-flex gap-2 items-center font-medium",
                {
                    "text-red-500" : choice === "less",
                    "text-green-500" : choice === "greater",
                    "text-blue-500" : choice === "between",
                }
            )}
        >              
            { choice === "greater" && <MdArrowUpward size={18}/> }
            { choice === "less" && <MdArrowDownward size={18}/> }
            { choice === "between" && <MdOutlineCompareArrows size={20}/> }

            { Choices[choice] }
        </span>
    )
}
