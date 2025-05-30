import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";
import { MdAdd } from "react-icons/md";
import { InputSearch } from "@/components/global/InputSearch";


interface Props {
    placeholder: string;
    destiny?: string;
    label?: string;
    children?: React.ReactNode;
}

export const ToolsSectionPage: FC<Props> = ({ placeholder, destiny, label, children }) => {
    return (
        <div className={clsx("flex gap-2 lg:gap-4", { "flex-col md:flex-row" : children })}>
            <InputSearch placeholder={placeholder}/>

            { children !== undefined && children }

            {
                ( destiny && label ) && (
                    <Link 
                        href={destiny} 
                        className="flex h-11 min-w-fit items-center gap-2 font-normal px-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    >
                        <MdAdd size={24} className="min-w-6 min-h-6"/>
                        
                        <span className="hidden lg:block min-w-fit">
                            { label }
                        </span>
                    </Link>
                ) 
            }
        </div>
    )
}
