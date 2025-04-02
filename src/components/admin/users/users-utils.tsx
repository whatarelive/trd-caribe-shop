import { PiUserCircleLight } from "react-icons/pi";
import type { FC } from "react";

export const UserNameView: FC<{ value: string }> = ({ value }) => {
    return (
        <div className="inline-flex gap-2 items-center">
            <PiUserCircleLight size={28}/>
            
            <span className="line-clamp-1">
                { value }
            </span>
        </div>
    )
}
