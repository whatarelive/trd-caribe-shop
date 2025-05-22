"use client";

import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { MdShoppingCart } from "react-icons/md";

export const CartCounter: FC<{ stock: number, className?: string }> = ({ stock, className }) => {
    const [counter, setCounter] = useState(1);

    const increment = () => {
        if(counter >= stock) return;
        setCounter(counter + 1);
    }

    const decrement = () => {
        if (counter === 1) return;
        setCounter(counter - 1);
    }

    return (
        <div className={cn("flex p-3 pt-0 justify-between items-center select-none", className)}>
            <div className="flex border border-gray-400 rounded-md">
                <button
                    onClick={decrement} 
                    className="border-r border-gray-400 py-1 px-2 cursor-pointer font-medium hover:text-orange-400"
                >
                    -
                </button>

                <span className="px-2 py-1">{ counter }</span>

                <button 
                    onClick={increment}
                    className="border-l border-gray-400 py-1 px-2 cursor-pointer font-medium hover:text-orange-400"
                >
                    +
                </button>
            </div>

            <button className="inline-flex items-center p-2 gap-1.5 rounded-md cursor-pointer bg-blue-400 text-white hover:bg-blue-500">
                <MdShoppingCart size={20}/>
                Añadir
            </button>
        </div>
    )
}
