import clsx from "clsx";
import { PiUserCircleLight } from "react-icons/pi";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

import type { FC } from "react";

export const UserNameView:FC<{ value: string }> = ({ value }) => {
    return (
        <div className="inline-flex gap-2 items-center">
            <PiUserCircleLight size={28}/>
            
            <span className="line-clamp-1">
                { value }
            </span>
        </div>
    )
}

export const UsersRole:FC<{ isStaff: boolean }> = ({ isStaff }) => {
    return (
        <span 
            className={clsx(
                "flex grow justify-center p-1.5 rounded-md font-medium lg:inline-flex", 
                { 
                    "bg-green-100 text-green-500" : isStaff, 
                    "bg-red-100 text-red-500" : !isStaff 
                }
            )}
        >
            { isStaff ? "administrador" : "cliente" }
        </span>
    )
}

export const ButtonUserChangeRole:FC<{ isStaff: boolean }> = ({ isStaff }) => {
    return (
        <button 
            className={clsx(
                "p-2 rounded-md border border-neutral-500 cursor-pointer hover:text-white",
                {
                    "hover:bg-red-400 hover:border-red-400": isStaff,
                    "hover:bg-green-400 hover:border-green-400": !isStaff 
                }
            )}
        >
            <MdOutlinePublishedWithChanges size={20}/>
        </button>
    )
}