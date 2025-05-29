'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, type FC } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    filters: { 
        label: string, 
        value: string 
    } [];
}

export const SelectOrderBy: FC<Props> = memo(({ filters }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter(); 

    const handleSelect = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== "null") params.set("ordering", value);
        else params.delete("ordering");
        
        replace(`${pathname}?${params.toString()}`);
    }, []);

    return (
        <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-full h-11 bg-transparent md:w-fit">
                <SelectValue placeholder="Ordenar lista" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="null">Cancelar selección</SelectItem>
                {filters.map((filter, index) => (
                    <div key={index}>
                        <SelectItem value={`${filter.value}`}>
                            {filter.label}
                            <ArrowUp size={24} className="text-green-500" />
                        </SelectItem>
                        <SelectItem value={`-${filter.value}`}>
                            {filter.label} 
                            <ArrowDown size={24} className="text-red-500" />
                        </SelectItem>
                    </div>
                ))}
            </SelectContent>
        </Select>
    )
})
