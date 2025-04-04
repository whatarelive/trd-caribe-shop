import type { FC } from "react";

export const TitlePage: FC<{ title: string }> = ({ title }) => {
    return (
        <h1 className="text-2xl lg:text-2xl font-semibold text-neutral-500">
            { title }
        </h1>
    )
}
