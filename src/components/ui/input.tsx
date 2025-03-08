"use client";

import { useState, type FC } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import type { ITextInput } from "@/src/types/components";

const TextInput: FC<ITextInput> = ({ label, icon, ...props }) => {
    const Icon = icon;

    return (
        <div className="input-container">
            <label htmlFor={props.name} className="text-neutral-600 text-sm font-semibold mb-1 select-none">
                { label }
            </label>
    
            <div className="input-subcontainer">
                { Icon && <Icon size={20}/> }
                
                <input 
                    id={props.name} 
                    autoComplete="off"
                    className="w-full p-2 border-0 text-sm bg-transparent outline-none"
                    { ...props } 
                />
            </div>
        </div>
    )
}

const TextInputWithPassword: FC<ITextInput> = ({ label, icon, ...props }) => {
    const [view, setView] = useState(false);
    const Icon = icon;

    const handleClick = () => setView(!view);

    return (
        <div className="input-container">
            <label htmlFor={props.name} className="text-neutral-600 text-sm font-semibold mb-1 select-none">
                { label }
            </label>

            <div className="input-subcontainer">
                { Icon && <Icon size={20}/> }

                <input 
                    id={props.name} { ...props } 
                    className="w-full p-2 border-0 text-sm bg-transparent outline-none"
                    type={ view ? "text" : "password" }    
                />

                { 
                    view 
                    ? <MdOutlineVisibility size={20} onClick={handleClick} className="cursor-pointer"/> 
                    : <MdOutlineVisibilityOff size={20} onClick={handleClick} className="cursor-pointer"/> 
                }
            </div>
        </div>
    )
}

export {
    TextInput,
    TextInputWithPassword,
}