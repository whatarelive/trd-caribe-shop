import clsx from "clsx";
import Link from "next/link";
import { type FC, memo } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

interface Props {
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
}

export const PaginationArrow: FC<Props> = memo(({ href, direction, isDisabled }) => {
    const className = clsx(
        "flex gap-2 px-2 h-10 min-w-10 items-center justify-center rounded-md border",
        {
            "pointer-events-none text-gray-300 text-gray-100 border-gray-100": isDisabled,
            "hover:bg-gray-50 border-gray-300 text-gray-600": !isDisabled,
            "mr-2 md:mr-4": direction === 'left',
            "flex-row-reverse ml-2 md:ml-4": direction === 'right',
        }
    );

    const Icon = direction === 'left' ? MdArrowBack : MdArrowForward;
    const label = direction === 'left' ? "Anterior" : "Siguiente";

    return isDisabled ? (
        <div className={className}>
            <Icon size={18} />
            <span>{ label }</span>
        </div>
    ) : (
        <Link href={href} className={className}>
            <Icon size={18} />
            <span>{ label }</span>
        </Link>
    );
});
PaginationArrow.displayName = "Paginate Item Arrow"