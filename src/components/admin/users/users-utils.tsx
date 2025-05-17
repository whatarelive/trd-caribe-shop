import clsx from "clsx";
import type { FC } from "react";
import { PiUserCircleLight } from "react-icons/pi";
import { MdOutlinePublishedWithChanges } from "react-icons/md";


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

export const ButtonUserChangeRole:FC<{ isStaff: boolean }> = ({ isStaff }) => {
    return (
        <button 
            className={clsx(
                "p-2 rounded-md bg-gray-100 cursor-pointer transition-colors text-gray-400 hover:text-white",
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