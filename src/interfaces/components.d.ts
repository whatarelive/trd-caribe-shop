import type { ComponentProps, DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface ILayout {
    readonly children: React.ReactNode;
};

export interface IPage {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export interface IFilters {
    search?: string;
    page: number;
    limit: number;
}

// Props del componente Pagination
export interface PaginationProps {
    currentPage: number;
    count: number;
    limit: number;
    className?: string;
}

export interface ArrowProps {
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
}

export interface NumberProps {
    page: number | string;
    href: string;
    isActive: boolean;
    position: "start" | "end" | null;
}