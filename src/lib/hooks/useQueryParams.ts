'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";


export function useQueryParams(query: string) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter(); 

    // Función memorizada para modificar los searchParams según valor nuevo.
    const handleSelect = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== "null") params.set(query, value);
        else params.delete(query);
        
        replace(`${pathname}?${params.toString()}`);
    }, [query]);


    // Función para modificar el searchParams para busquedas en la plataforma.
    const handleChange = useDebouncedCallback((term?: string) => {
        const params = new URLSearchParams(searchParams);
        
        if (term) params.set(query, term); 
        else params.delete(query);

        replace(`${pathname}?${params.toString()}`);
    }, 1000);


    return {
        param: (searchParams.get(query) ?? "").toString(),
        handleSelect,
        handleChange,
    };
}