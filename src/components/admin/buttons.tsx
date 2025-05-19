"use client";

import { type FC, memo } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export const ButtonDeleteItem: FC<Props> = memo(({ className, children }) => {
    return (
        <button
            type="button"
            onClick={() => {}}
            className={cn(
                `p-2 rounded-md bg-gray-100 text-gray-400 transition-colors cursor-pointer 
                active:bg-red-500 active:text-white active:border-red-500 
                sm:hover:bg-red-500 sm:hover:text-white sm:hover:border-red-500`, 
                className
            )}
        >
            <MdDeleteOutline size={20}/>
            {children}
        </button>
    )
})
ButtonDeleteItem.displayName = "ButtonDeleteItem"