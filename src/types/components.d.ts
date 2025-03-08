import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import type { IconType } from "react-icons";

export interface ILayout {
    readonly children: React.ReactNode;
};

export interface ITextInput extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string; 
    icon?: IconType;
    errors?: string[];
};