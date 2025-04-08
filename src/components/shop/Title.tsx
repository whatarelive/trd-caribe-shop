import type { FC } from "react";

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export const Title: FC<Props> = ({ title, subtitle, className }) => {
    return (
        <section className={`mt-3 max-w-7xl mx-auto ${ className }`}>
            <h1 className="antialiased text-3xl font-semibold">
                { title }
            </h1>

            {
                subtitle && (
                    <h3 className="text-lg text-gray-500 mb-5">{ subtitle }</h3>
                )
            }
        </section>
    )
}