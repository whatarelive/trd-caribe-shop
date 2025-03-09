import clsx from "clsx"
import Link from "next/link"

interface Props {
    href: string;
    label: string;
    children?: React.ReactNode;
    isActive: boolean;
}

export const LinkComponent: React.FC<Props> = ({ href, label, children, isActive }) => {
    return (
        <li>
            <Link 
                href={ href }
                className={clsx(
                    "flex items-center gap-3 py-2 px-4 rounded-lg text-lg hover:bg-blue-50 hover:text-blue-500 transition-colors", 
                    { "text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors": isActive }
                )}
            >
                { children }
                <span>{ label }</span>
            </Link>
        </li>  
    )
}