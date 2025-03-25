import clsx from "clsx";
import type { FC } from "react";
import { MdDeleteOutline, MdOutlinePublishedWithChanges } from "react-icons/md";
import type { IUser } from "@/interfaces/models/user.interface";

interface Props {
    user: IUser;
}

export const UserCard: FC<Props> = ({ user }) => {
    return (
        <li className="flex flex-col gap-2 bg-white p-2 rounded-md">
            <div>
                <h3 className="line-clamp-2 font-medium">
                    { `${ user.first_name} ${user.last_name}` }
                </h3>

                <p>{ user.email }</p>
            </div>

            <hr className="text-gray-200"/>

            <div className="flex items-center justify-between gap-2">
                <span 
                    className={clsx(
                        "p-1.5 rounded-md font-medium grow text-center", 
                        { 
                            "bg-green-100 text-green-500" : user.is_staff, 
                            "bg-red-100 text-red-500" : !user.is_staff 
                        }
                    )}
                >
                    { user.is_staff ? "administrador" : "cliente" }
                </span>
                
                <button 
                    className={clsx(
                        "p-2 rounded-md border border-neutral-500 hover:text-white",
                        {
                            "hover:bg-red-400 hover:border-red-400": user.is_staff,
                            "hover:bg-green-400 hover:border-green-400": !user.is_staff 
                        }
                    )}
                >
                    <MdOutlinePublishedWithChanges size={20}/>
                </button>

                <button 
                    className="p-2 rounded-md border border-neutral-500 hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer"
                >
                    <MdDeleteOutline size={20}/>
                </button>
            </div>            
        </li>
    )
}
