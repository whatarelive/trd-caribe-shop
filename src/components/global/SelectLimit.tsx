'use client'

import { memo, type FC } from "react";
import { useQueryParams } from "@/lib/hooks/useQueryParams";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export const SelectLimit: FC<{ label: string, count?: number }> = memo(({ label, count }) => {
    const { param, handleSelect } = useQueryParams("limit");

    return (
        <Select defaultValue={param} onValueChange={handleSelect}>
            <SelectTrigger className="w-full h-11 bg-transparent md:w-fit">
                <SelectValue placeholder={`Número de ${label}s`} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="null">Cancelar selección</SelectItem>
                {Array.from({ length: count ?? 10 }).map((_, index) => (
                    <SelectItem key={index} value={(index + 1).toString()}>
                        { index + 1 } { index === 0 ? label : `${label}s` }
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
})
