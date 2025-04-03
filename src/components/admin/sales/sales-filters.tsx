"use client";

import { memo } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const filters = [
    { label: "Todos", value: "all" },
    { label: "Pendiente", value: "pending" },
    { label: "Pagada", value: "paid" },
    { label: "Enviada", value: "shipped" },
    { label: "Entregada", value: "delivered" },
    { label: "Cancelada", value: "canceled" },
]

export const SaleFilters = memo(() => {
    const { push } = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();

        const url = event.target.value === "all" 
            ? `${pathName}?page=1` 
            : `${pathName}?page=1&status=${event.target.value}`;

        push(url);
    }

    return (
         <div className="input-subcontainer min-h-11 border-2 border-gray-100">
            <select 
                defaultValue={searchParams.get("status") ?? "all"} 
                onChange={handleFilter}
                className="min-h-11 min-w-36 w-full border-0 outline-none text-sm" 
            >
                {
                    filters.map(({ label, value }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))
                }
            </select>
        </div>
    )
})
SaleFilters.displayName = "SaleFilters"