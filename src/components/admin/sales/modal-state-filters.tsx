"use client";

import clsx from "clsx";
import { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdKeyboardArrowDown, MdOutlineFilterList, MdOutlineShoppingCart } from "react-icons/md";

const states = [
    { label: "Todos", value: "" },
    { label: "Pendiente", value: "pending" },
    { label: "Pagada", value: "paid" },
    { label: "Enviada", value: "shipped" },
    { label: "Entregada", value: "delivered" },
    { label: "Cancelada", value: "canceled" },
]

const globalFilter = states.map((state) => state.value);

interface Props {
    filters: string[] | string | undefined;
}

export const SaleStateFilters: FC<Props> = ({ filters }) => {
    const [open, setOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>(typeof filters === "string" || !filters ? [] : filters);
    
    const router = useRouter();
    const pathName = usePathname();

    const handleClickItem = (value: string) => {
        if (value === "" && !selectedFilters.includes("")) {
            return setSelectedFilters(["", ...globalFilter]);
        }
        
        if (value === "" && selectedFilters.includes("")) {
            return setSelectedFilters([]);
        }   

        if (selectedFilters.includes(value)) {
            const update = selectedFilters.filter((filter) => filter !== value)
            setSelectedFilters(update);

        } else {
            setSelectedFilters((oldFilters) => [...oldFilters, value]);
        };
    }

    const handleClickFilter = () => {
        if (selectedFilters.length === 0 && (filters as string[]).length === 0) return;
        
        let url: string = "";

        if (selectedFilters.length !== 0) {
            selectedFilters.forEach((p) => {
                if (p !== "") {
                    url += `&status=${p}`;
                }
            });
        }
        
        router.push(`${pathName}?page=1${url}`);
    }

    return (
        <div className="bg-gray-50 rounded-md p-4">
            <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1">
                    <MdOutlineShoppingCart size={20}/>

                    <h2 className="text-lg">
                        Ventas
                    </h2>
                </div>

                <div className="inline-flex gap-2 md:gap-4">
                    <button 
                        onClick={handleClickFilter}
                        className="inline-flex min-w-10 justify-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                    >
                        <MdOutlineFilterList size={20}/>
                        <span className="hidden md:block">Aplicar</span>
                    </button>

                    <button 
                        onClick={() => setOpen(!open)}
                        className="inline-flex gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                    >
                        <MdKeyboardArrowDown 
                            size={24} 
                            className={clsx(
                                "transition-all",
                                { "rotate-180" : !open, "rotate-0" : open}
                            )}
                        />
                        <span className="hidden md:block">Mostrar</span>
                    </button>
                    
                </div>
            </div>

            <hr className={clsx("text-gray-300", { "block my-3" : open, "hidden" : !open })}/>

            <ul className={clsx(
                    "flex flex-wrap gap-2 md:gap-4 rounded-md",
                    {
                        "block" : open,
                        "hidden" : !open,
                    }
                )}
            >
                {states.map((status) => (
                    <li 
                        key={status.value} 
                        onClick={() => handleClickItem(status.value)}
                        className={clsx(
                            "border p-1.5 rounded-sm cursor-pointer",
                            {
                                "bg-blue-100 text-blue-400 border-blue-400" : selectedFilters.includes(status.value),
                                "bg-white text-gray-300 border-gray-300" : !selectedFilters.includes(status.value),
                            }
                        )}
                    >
                        { status.label }
                    </li>
                ))}
            </ul>
        </div>
    )
}
