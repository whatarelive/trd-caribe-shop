import clsx from "clsx"
import type { FC } from "react";

export const ComplaintState: FC<{ active: boolean }> = ({ active }) => (
     <span 
        className={clsx(
            "flex justify-center border p-1.5 rounded-sm lg:inline-flex",
            {
                "bg-green-100 border-green-500 text-green-500" : active,
                "bg-red-100 border-red-500 text-red-500" : !active,
            }
        )}
    >
        { active ? "Resuelta" : "No resuelta" }
    </span>
)
