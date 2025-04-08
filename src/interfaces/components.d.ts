import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import type { IconType } from "react-icons";
import { DetailedHTMLProps } from 'react';

export interface ILayout {
    readonly children: React.ReactNode;
};

export interface ITextInput extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string; 
    icon?: IconType;
    errors?: string[];
};

export interface ITextArea extends React.ComponentProps<"textarea"> {
    label: string; 
    errors?: string[];
}