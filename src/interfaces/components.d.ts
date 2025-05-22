import type { ComponentProps, DetailedHTMLProps, InputHTMLAttributes } from "react";
import type { IconType } from "react-icons";

export interface ILayout {
    readonly children: React.ReactNode;
};

export interface ITextInput extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string; 
    icon?: IconType;
    errors?: string[];
};

export interface ITextArea extends ComponentProps<"textarea"> {
    label: string; 
    errors?: string[];
}

// Props del componente Pagination
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
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