"use client"

import * as RechartsPrimitive from "recharts";
import type { FC, ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ChartConfig = {
    [key: string]: {
        label?: React.ReactNode;
        color?: string;
    };
}

// Props del componente
interface ContainerProps extends ComponentProps<"div"> {
    config: ChartConfig;
    children: React.ReactElement;
}

// Componente principal
export const ChartContainer: FC<ContainerProps> = ({ id, className, children, config, ...props }) => {
    return (
        <div
            data-chart={`chart-${id}`}
            className={cn(
                `[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground 
                [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 
                [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border 
                [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted flex aspect-video 
                justify-center text-xs`,
                className,
            )}
            {...props}
        >
            <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                { children }
                
            </RechartsPrimitive.ResponsiveContainer>
        </div>
    )
}