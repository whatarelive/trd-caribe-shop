"use client"

import type { FC, ComponentProps } from "react";
import { Root, Trigger, Portal, Content } from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";


export const HoverCard: FC<ComponentProps<typeof Root>> = ({ ...props }) => {
    return <Root data-slot="hover-card" {...props} />
}

export const HoverCardTrigger: FC<ComponentProps<typeof Trigger>> = ({ ...props }) => {
    return <Trigger data-slot="hover-card-trigger" {...props} />
}

export const HoverCardContent: FC<ComponentProps<typeof Content>> = ({ className, align, sideOffset, ...props }) => {
    return (
        <Portal data-slot="hover-card-portal">
            <Content
                data-slot="hover-card-content"
                align={align ?? "center"}
                sideOffset={sideOffset ?? 4}
                className={cn(
                    `bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out 
                    data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 
                    data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 
                    data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 
                    origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden`,
                    className
                )}
                {...props}
            />
        </Portal>
    )
}