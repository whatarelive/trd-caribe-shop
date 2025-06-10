'use client'

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ShimmerImageProps {
    src: string
    alt: string
    width: number
    height: number
    className?: string;
}

export function LoadingImage({ src, alt, width, height, className }: ShimmerImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative">
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={cn(`transition-opacity duration-700 ${ isLoading ? "opacity-0" : "opacity-100" }`, className)}
                onLoad={() => setIsLoading(false)}
                loading="lazy"
            />

            {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
                </div>
            )}
        </div>
    )
}