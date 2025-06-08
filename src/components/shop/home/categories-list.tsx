'use client'

import Link from "next/link";
import { useEffect } from "react";
import { useCategoriesStore } from "@/store/categorie-store";


export function CategoriesList() {
    const { categories, isLoading, setCategories } = useCategoriesStore();

    useEffect(() => {
       setCategories();
    }, []);


    if (isLoading) {
        return (
            <ul className="flex gap-3 overflow-x-auto elegant-scrollbar max-w-screen pb-2">
                {Array.from({ length: 12 }).map((_, index) => (
                    <li key={index} className="skeleton w-32 h-9">
                        <span></span>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <ul className="flex gap-3 overflow-x-auto elegant-scrollbar max-w-screen pb-2">
            {categories.map(({ id, name }) => (
                <li key={id} className="py-2 px-4 rounded-md bg-white border hover:shadow-md hover:text-blue-400">
                    <Link href={`/${name.toLowerCase()}/`}>
                        { name }
                    </Link>
                </li>
            ))}
        </ul>
    )
}
