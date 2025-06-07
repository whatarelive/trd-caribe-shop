'use client'

import { memo, type FC } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryParams } from "@/lib/hooks/useQueryParams";
import { Input } from "@/components/ui/input";

interface Props {
    placeholder: string;
    className?: string;
}

export const InputSearch: FC<Props> = memo(({ placeholder, className }) => {
    const { param, handleChange } = useQueryParams("search");

    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"/>
            <Input 
                type="search"
                defaultValue={param}
                onChange={({ target }) => handleChange(target.value)}
                className={cn("w-full md:max-w-96 h-11 bg-transparent pl-10", className)} 
                placeholder={placeholder}
            />            
        </div>
    )
})
