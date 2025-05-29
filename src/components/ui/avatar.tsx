import type { ComponentProps, FC } from "react";

export const Avatar: FC<ComponentProps<"span">> = ({ children }) => (
    <div
        data-slot="avatar"
        className="relative flex size-8 shrink-0 overflow-hidden rounded-full"
    >
        <span
            data-slot="avatar-fallback"
            className="bg-muted flex size-full items-center justify-center rounded-full uppercase"
        >
            { children }
        </span>
    </div>
)