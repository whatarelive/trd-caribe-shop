"use client";

import type { FC } from "react";
import { MdSearch } from "react-icons/md";
import type { ITextInput } from "@/interfaces/components";

export const SearchInput: FC<Omit<ITextInput, "icon" | "label">> = ({ ...props }) => {
    return (
        <div className="flex h-11 px-2 items-center w-full gap-2 border border-gray-100 rounded-md focus:outline-blue-400">
            <MdSearch size={20} className="text-gray-400"/>

            <input 
                type="search"  
                autoComplete="off"
                className="w-full outline-0" 
                { ...props }
            />
        </div>
    )
}

