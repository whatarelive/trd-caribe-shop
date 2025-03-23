"use client"

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/utils/pagination";

interface Props {
    totalPages: number; 
}

export function usePagination({ totalPages }: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const allPages = useMemo(
        () => generatePagination(currentPage, totalPages),
        [currentPage, totalPages]
    );

    const createPageURL = (page: number | string) => {
        const params = new URLSearchParams(searchParams);

        params.set("page", page.toString());
        
        return `${pathname}?${params.toString()}`;
    };

    return {
        allPages,
        currentPage,
        createPageURL,
    }
}