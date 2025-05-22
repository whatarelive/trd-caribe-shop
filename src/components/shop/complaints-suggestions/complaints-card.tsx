import { UserNameView } from "@/components/admin/users/users-utils";

import type { FC } from "react";
import type { IComplaintsAndSuggestions } from "@/interfaces/models/complaints-suggestions.interface";

export const ComplaintsCard: FC<{ suggestion: IComplaintsAndSuggestions }> = ({ suggestion }) => {
    return (
        <li className="flex flex-col p-4 gap-3 bg-white rounded-md shadow-md hover:cursor-pointer hover:shadow-lg">
            <div className="flex flex-col min-[390px]:flex-row gap-2 justify-between">
                <UserNameView value={ suggestion.user }/>
                <b>{ suggestion.created }</b>
            </div>

            <hr className="text-gray-300"/>

            <p className="text-wrap">
                { suggestion.text }
            </p>
        </li>
    )
}