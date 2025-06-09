'use client'

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Bookmark } from "lucide-react";
import { useCategoriesStore } from "@/store/categorie-store";


export function CategoriesFilter() {
    const pathname = usePathname();
    const { categories, setCategories } = useCategoriesStore();

    useEffect(() => {
        if (!categories || categories.length === 0) {
            setCategories();
        }
    }, [])

    return (
        <div className="hidden min-w-max h-fit bg-white p-6 border shadow-md rounded-md lg:flex lg:flex-col lg:justify-between">
            <div>
                <h3 className="text-xl font-medium">
                    Listado de categorías
                </h3>

                <ul className="space-y-1 overflow-y-auto elegant-scrollbar mt-5 h-full">
                    {categories.map(({ id, name }) => (
                        <li key={id}>
                            <Link 
                                href={`/${name.toLowerCase()}`} 
                                className={clsx(
                                    "flex items-center gap-1 px-4 py-1 rounded-md hover:bg-gray-100", 
                                    {
                                        "text-amber-500": decodeURIComponent(pathname).includes(name.substring(1, name.length)),
                                    }
                                )}
                            >
                                <Bookmark size={16}/>
                                {name} 
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <span className="text-sm text-center text-muted-foreground mt-20">
                {categories.length} categorías disponibles
            </span>
        </div>
    )
}
