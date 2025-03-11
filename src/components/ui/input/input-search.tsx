"use client";

import type { FC } from "react";
import type { ITextInput } from "@/src/types/components";

export const SearchInput: FC<Omit<ITextInput, "icon" | "label">> = ({ ...props }) => {
    return (
        <input 
            type="search"  
            className="w-full lg:w-80 border border-neutral-400 rounded-md p-2 lg:p-3 focus:outline-blue-400" 
            { ...props }
        />
    )
}

