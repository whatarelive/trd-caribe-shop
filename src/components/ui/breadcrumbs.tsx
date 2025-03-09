import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdChevronRight } from "react-icons/md";
import { generateBreadcrumbs, type Breadcrumb } from "@/src/lib/utils/navigation";

export const Breadcrumbs = () => {
    const pathname = usePathname();
    const breadcrumbs = generateBreadcrumbs(pathname);

    return (
        <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                {
                    breadcrumbs.map((breadcrumb: Breadcrumb, index: number) => {
                        return (breadcrumbs.length !== index + 1) ? (
                            <div key={index} className="inline-flex items-center gap-1.5">
                                <li className="inline-flex items-center gap-1.5">
                                    <Link href={breadcrumb.href} className="text-lg text-neutral-500 hover:text-blue-500 transition-colors">
                                        { breadcrumb.label }
                                    </Link>
                                </li>

                                {
                                    breadcrumbs.length - 2 >= index && (
                                        <li role="presentation" aria-hidden="true" className="text-neutral-500">
                                            <MdChevronRight size={20} />
                                        </li>
                                    )
                                }
                            </div>
                        ) : (
                            <span 
                                key={breadcrumbs.length + 1}
                                role="link"
                                aria-disabled="true"
                                aria-current="page"
                                className="font-normal text-foreground text-lg"
                            >
                                { breadcrumb.label }
                            </span>
                        )
                    })
                }
            </ol>
        </nav>
    )
}