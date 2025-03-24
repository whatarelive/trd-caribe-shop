import clsx from "clsx";
import Link from "next/link";
import { memo, type FC } from "react";

interface Props {
    page: number | string;
    href: string;
    isActive: boolean;
    position: "start" | "end" | null;
}

export const PaginationNumber: FC<Props> = memo(({ page, href, isActive, position }) => {
    const className = clsx(
        "flex h-10 w-10 items-center justify-center text-sm border",
        {
            "z-10 bg-blue-600 border-blue-600 text-white": isActive,
            "hover:bg-gray-100 border-gray-300 text-gray-600": !isActive,
            "rounded-s-md": position === "start",
            "rounded-e-md": position === "end"
        }
    );

    return isActive || page === "..." ? (
        <span className={className}>
            {page}
        </span>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    );
})
PaginationNumber.displayName = "Paginate Item Number"