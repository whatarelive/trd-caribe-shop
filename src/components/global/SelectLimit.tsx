'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, type FC } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export const SelectLimit: FC<{ label: string, count?: number }> = memo(({ label, count }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter(); 

    const handleSelect = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== "null") params.set("limit", value);
        else params.delete("limit");
        
        replace(`${pathname}?${params.toString()}`);
    }, []);

    return (
        <Select defaultValue={(searchParams.get("limit") ?? "").toString()} onValueChange={handleSelect}>
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
