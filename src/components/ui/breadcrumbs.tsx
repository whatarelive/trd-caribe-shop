import Link from "next/link";
import type { FC } from "react";
import { MdChevronRight } from "react-icons/md";

interface Breadcrumb {
    label: string;
    destiny: string;
}

interface Props {
    breadcrumbs: Breadcrumb[];
    final: string;
}

export const Breadcrumbs: FC<Props> = ({ breadcrumbs, final }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap items-center break-words text-sm">
                {
                    breadcrumbs.map((breadcrumb, index) => (
                        <div key={index} className="inline-flex items-center">
                            <li className="inline-flex items-center gap-1.5">
                                <Link 
                                    href={breadcrumb.destiny} 
                                    className="text-neutral-500 hover:text-blue-500 transition-colors"
                                >
                                    {breadcrumb.label}
                                </Link>
                            </li>

                            <li role="presentation" aria-hidden="true" className="text-neutral-500">
                                <MdChevronRight size={20} />
                            </li>
                        </div>
                    ))
                }

                <span 
                    role="link"
                    aria-disabled="true"
                    aria-current="page"
                    className="font-normal text-foreground"
                >
                    { final }
                </span>
            </ol>
        </nav>
    )
}
