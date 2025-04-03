import { ButtonDeleteItem } from "@/components/admin/buttons";
import { ButtonUserChangeRole, UsersRole } from "@/components/admin/users/users-utils";

import type { FC } from "react";
import type { IUser } from "@/interfaces/models/user.interface";

export const UserCard:FC<{ user: IUser }> = ({ user }) => {
    return (
        <li className="flex flex-col gap-2 bg-white p-2 rounded-md">
            <div>
                <h3 className="line-clamp-2 font-medium">
                    { `${ user.first_name } ${ user.last_name }` }
                </h3>

                <p>{ user.email }</p>
            </div>

            <hr className="text-gray-200"/>

            <div className="flex items-center justify-between gap-2">
                <UsersRole isStaff={ user.is_staff }/>
                <ButtonUserChangeRole isStaff={ user.is_staff }/>          
                <ButtonDeleteItem />
            </div>            
        </li>
    )
}
