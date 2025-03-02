"use client";

import { useState, type FC } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import type { ITextInput } from "@/src/types/components";

import styles from "./input.module.css";

const TextInput: FC<ITextInput> = ({ label, icon, ...props }) => {
    const Icon = icon;

    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={props.name}>
                { label }
            </label>
            <div className={styles.sub_container}>
                { Icon && <Icon size={18}/> }
                <input id={props.name} className={styles.input} { ...props } />
            </div>
        </div>
    )
}

const TextInputWithPassword: FC<ITextInput> = ({ label, icon, ...props }) => {
    const [view, setView] = useState(false);
    const Icon = icon;

    const handleClick = () => setView(!view);

    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={props.name}>
                { label }
            </label>
            <div className={styles.sub_container}>
                { Icon && <Icon size={18}/> }

                <input 
                    id={props.name} { ...props } 
                    className={styles.input} 
                    type={ view ? "text" : "password" }    
                />

                { 
                    view 
                    ? <MdOutlineVisibility size={18} onClick={handleClick} style={{ cursor: "pointer" }}/> 
                    : <MdOutlineVisibilityOff size={18} onClick={handleClick} style={{ cursor: "pointer" }}/> 
                }
            </div>
        </div>
    )
}

export {
    TextInput,
    TextInputWithPassword,
}