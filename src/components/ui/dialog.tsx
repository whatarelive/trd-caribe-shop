"use client"

import * as Primitive from "@radix-ui/react-dialog";

import type { FC, ComponentProps } from "react";
import { XIcon } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";


interface PropsClose 
  extends React.ComponentProps<typeof Primitive.Close>, 
  VariantProps<typeof buttonVariants> {}

export const Dialog: FC<ComponentProps<typeof Primitive.Root>> = ({ ...props }) => {
    return <Primitive.Root data-slot="dialog" {...props} />
}

export const DialogTrigger: FC<ComponentProps<typeof Primitive.Trigger>> = ({ ...props }) => {
    return <Primitive.Trigger data-slot="dialog-trigger" {...props} />
}

export const DialogClose: React.FC<PropsClose> = ({ size, variant, className, ...props }) => {
    return (
        <Primitive.Close 
            data-slot="dialog-close"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props} 
        />
    )
}

export const DialogHeader: FC<ComponentProps<"div">> = ({ className, ...props }) => {
    return (
        <div
            data-slot="dialog-header"
            className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
            {...props}
        />
    )
}

export const DialogFooter: FC<ComponentProps<"div">> = ({ className, ...props }) => {
    return (
        <div
            data-slot="dialog-footer"
            className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
            {...props}
        />
    )
}

export const DialogTitle: FC<ComponentProps<typeof Primitive.Title>> = ({ className, ...props }) => {
    return (
        <Primitive.Title
            data-slot="dialog-title"
            className={cn("text-lg leading-none font-semibold", className)}
            {...props}
        />
    )
}

export const DialogDescription: FC<ComponentProps<typeof Primitive.Description>> = ({ className, ...props }) => {
    return (
        <Primitive.Description
            data-slot="dialog-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    )
}

export const DialogContent: FC<ComponentProps<typeof Primitive.Content>> = ({ className, children, ...props }) => {
    return (
        <Primitive.Portal data-slot="dialog-portal">
            <Primitive.Overlay
                data-slot="dialog-overlay"
                className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 
                data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
            />
            <Primitive.Content
                data-slot="dialog-content"
                className={cn(
                    `bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 
                    data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] 
                    left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg 
                    border p-6 shadow-lg duration-200 sm:max-w-lg`,
                    className
                )}
                {...props}
            >
                { children }
                <Primitive.Close 
                    className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground 
                    absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 
                    focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 
                    [&_svg:not([class*='size-'])]:size-4"
                >
                    <XIcon />
                    <span className="sr-only">Close</span>
                </Primitive.Close>
            </Primitive.Content>
        </Primitive.Portal>
    )
}