"use client"

import { useState, memo, type FC, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";


export const InputPassword: FC<ComponentProps<"input">> = memo(({ ...props }) => {
    // Estado para controlar la visibilidad de la contraseña.
    const [ view, setView ] = useState<boolean>(false);

    // Icono condicional
    const IconView = view ? EyeOff : Eye;

    return (
        <>
            <Input 
                type={view ? "text" : "password"} 
                className="px-10"
                {...props} 
            />
            <IconView 
                className="absolute right-3 top-2 h-5 w-5 text-muted-foreground cursor-pointer" 
                onClick={() => setView(!view)}
            />
        </>
    )
})
