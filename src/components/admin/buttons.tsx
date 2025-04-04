"use client";

import { type FC, memo } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { cn } from "@/utils/tailwind-cn";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export const ButtonDeleteItem: FC<Props> = memo(({ className, children }) => {
    return (
        <button
            onClick={() => {}}
            className={cn(
                `p-2 rounded-md bg-gray-100 text-gray-400 hover:bg-red-500 hover:text-white hover:border-red-500 
                transition-colors cursor-pointer`, 
                className
            )}
        >
            <MdDeleteOutline size={20}/>
            {children}
        </button>
    )
})
ButtonDeleteItem.displayName = "ButtonDeleteItem"