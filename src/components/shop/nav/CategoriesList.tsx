"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

const categories = ["Alimentos", "Aseo", "Bebidas", "Calzado", "Herramientas", "Ropa", "Teléfonos"];

export const CategoriesList = () => {
    const [view, setView] = useState(false);
    
    return (
        <div className="h-fit relative">
            <span 
                onMouseEnter={() => setView(true)}
                className="hover:bg-gray-50 hover:text-blue-400 rounded-md p-1 px-3 hover:cursor-pointer"
            >
                Categorías
            </span>

            <ul 
                onMouseLeave={() => setView(false)}
                className={clsx(
                    "top-12 shadow-lg space-y-2 bg-white p-4 rounded-md",
                    { "absolute" : view, "hidden" : !view }
                )}
            >
                {
                    categories.map((cat) => (
                        <li key={cat} className="hover:text-orange-400">
                            <Link href={`/${cat.toLowerCase()}`}>
                                {cat}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}