'use client'

import { memo, type FC } from "react";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/hooks/useCart";
import { Button } from "@/components/ui/button";

interface Props {
    id: number;
    stock: number | null;
    className?: string;
}

export const CartCounter: FC<Props> = memo(({ id, stock, className }) => {
    const { counter, increment, decrement, addProductToCart } = useCart({ id, stock });
    
    return (
        <div className={cn("flex p-3 pt-0 justify-between items-center select-none", className)}>
            <div className="flex border border-gray-400 rounded-md">
                <Button
                    variant="ghost"
                    onClick={decrement} 
                    className="border-r rounded-r-none border-gray-400 px-3 font-medium hover:text-orange-400"
                >
                    -
                </Button>

                <span className="px-2 py-1.5 min-w-10 text-center">
                    { counter }
                </span>

                <Button
                    variant="ghost" 
                    onClick={increment}
                    className="border-l rounded-l-none border-gray-400 px-3 font-medium hover:text-orange-400"
                >
                    +
                </Button>
            </div>

            <Button  
                className="gap-1.5 bg-blue-400 text-white hover:bg-blue-500"
                onClick={addProductToCart}
            >
                <ShoppingCart fill="#fff" color="#fff" size={20}/>
                Añadir
            </Button>
        </div>
    )
})
