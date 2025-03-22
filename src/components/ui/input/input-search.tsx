"use client";

import type { FC } from "react";
import type { ITextInput } from "@/interfaces/components";

export const SearchInput: FC<Omit<ITextInput, "icon" | "label">> = ({ ...props }) => {
    return (
        <input 
            type="search"  
            className="w-full border border-gray-100 rounded-md p-2 lg:p-3 focus:outline-blue-400" 
            { ...props }
        />
    )
}

