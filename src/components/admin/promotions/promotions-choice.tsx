import clsx from "clsx";
import { ArrowDown, ArrowLeftRight, ArrowUp } from "lucide-react";
import type { PromotionChoice } from "@/interfaces/models/promotions.interface";

const CHOICES = {
    greater: "Mayor que", 
    less: "Menor que", 
    between: "Entre",
}

export function PromotionChoice({ choice }: { choice: PromotionChoice }) {
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
            { choice === "greater" && <ArrowUp size={18}/> }
            { choice === "less" && <ArrowDown size={18}/> }
            { choice === "between" && <ArrowLeftRight size={20}/> }

            { CHOICES[choice] }
        </span>
    )
}
