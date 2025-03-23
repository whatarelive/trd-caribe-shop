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
        "flex h-10 w-10 items-center justify-center rounded-md border border-gray-400 text-gray-600",
        {
        "pointer-events-none text-gray-300": isDisabled,
        "hover:bg-gray-100": !isDisabled,
        "mr-2 md:mr-4": direction === 'left',
        "ml-2 md:ml-4": direction === 'right',
        }
    );

    const Icon = direction === 'left' ? MdArrowBack : MdArrowForward;

    return isDisabled ? (
        <div className={className}><Icon size={18} /></div>
    ) : (
        <Link href={href} className={className}>
            <Icon size={18} />
        </Link>
    );
});
PaginationArrow.displayName = "Paginate Item Arrow"