"use client";

import { type FC, memo } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { cn } from "@/utils/tailwind-cn";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export const ButtonDeleteItem: FC<Props> = memo(({ className, children }) => {
    return (
        <button
            onClick={() => {}}
            className={cn("button-danger", className)}
        >
            <MdDeleteOutline size={20}/>
            {children}
        </button>
    )
})
