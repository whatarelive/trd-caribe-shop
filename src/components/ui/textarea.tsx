import { ITextArea } from "@/interfaces/components";
import { cn } from "@/utils/tailwind-cn";
import type { FC } from "react";

export const Textarea: FC<ITextArea> = ({ label, errors, className, ...props }) => {
    return (
        <div className="input-container">
            {/* Etiqueta del campo */}
            <label htmlFor={props.name} className="text-neutral-600 text-sm font-semibold mb-1 select-none">
                { label }
            </label>

            <textarea
                className={cn(
                    `flex min-h-[70px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm 
                    placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-300
                    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
                    className
                )}
                {...props}
            />
            
            {/* Sección de errores */}
            {
                errors && (
                    <div id={props["aria-describedby"]} aria-live="polite" aria-atomic="true">
                        {
                            <p className="text-sm text-red-500" key={errors[0]}>
                                { errors[0] }
                            </p>
                        }
                    </div>
                )
            }
        </div>
    )
}