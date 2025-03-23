import type { FC } from "react";

interface Props {
    title: string;
}

export const TitlePage: FC<Props> = ({ title }) => {
    return (
        <h1 className="text-2xl lg:text-2xl font-semibold text-neutral-500">
            { title }
        </h1>
    )
}
