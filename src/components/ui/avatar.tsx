import { cn } from "@/lib/utils";
import type { ComponentProps, FC } from "react";

export const Avatar: FC<ComponentProps<"span">> = ({ children, className }) => (
    <div
        data-slot="avatar"
        className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
    >
        <span
            data-slot="avatar-fallback"
            className="bg-muted flex size-full items-center justify-center rounded-full uppercase"
        >
            { children }
        </span>
    </div>
)