'use client'

import { memo, type FC } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useQueryParams } from "@/lib/hooks/useQueryParams";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    filters: { 
        label: string, 
        value: string 
    } [];
}

export const SelectOrderBy: FC<Props> = memo(({ filters }) => {
    const { param, handleSelect } = useQueryParams("ordering");

    return (
        <Select onValueChange={handleSelect} defaultValue={param}>
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
