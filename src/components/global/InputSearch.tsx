'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo, type FC } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
    placeholder: string;
}

export const InputSearch: FC<Props> = memo(({ placeholder }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleChange = useDebouncedCallback((term?: string) => {
        const params = new URLSearchParams(searchParams);
        
        if (term) params.set("search", term); 
        else params.delete("search");

        replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"/>
            <Input 
                type="search"
                defaultValue={searchParams.get("search")?.toString() ?? ""}
                onChange={({ target }) => handleChange(target.value)}
                className="w-full h-11 pl-10" 
                placeholder={placeholder}
            />            
        </div>
    )
})
