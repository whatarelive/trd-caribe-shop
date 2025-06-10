'use client'

import { useState, useEffect, useCallback, useContext, createContext, FC, ComponentProps } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];

type CarouselProps = {
    opts?: CarouselOptions;
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
}

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
    const context = useContext(CarouselContext);

    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />")
    }

    return context;
}

export const Carousel: FC<ComponentProps<"div"> & CarouselProps> = ({ 
    setApi, opts, className, children, ...props
}) => {
    const [carouselRef, api] = useEmblaCarousel(
        { ...opts, axis: "x" }, 
        [ Autoplay({ delay: 3000 }) ]
    );

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api: CarouselApi) => {
        if (!api) return;
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);

    useEffect(() => {
        if (!api || !setApi) return;
        setApi(api);
    }, [api, setApi]);

    useEffect(() => {
        if (!api) return;
        onSelect(api);
        api.on("reInit", onSelect);
        api.on("select", onSelect);

        return () => {
            api?.off("select", onSelect);
        }
    }, [api, onSelect]);

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api: api,
                orientation: "horizontal",
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
            }}
        >
            <div className={cn("relative", className)} data-slot="carousel" {...props}>
                {children}
            </div>
        </CarouselContext.Provider>
    )
}

export const CarouselContent: FC<ComponentProps<"div">> = ({ className, ...props }) => {
    const { carouselRef } = useCarousel();

    return (
        <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
            <div className={cn("flex -ml-4", className)} {...props} />
        </div>
    )
}

export const CarouselItem: FC<ComponentProps<"div">> = ({ className, ...props }) => {
    return (
        <div
            data-slot="carousel-item"
            className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
            {...props}
        />
    )
}

export const CarouselPrevious: FC<ComponentProps<typeof Button>> = ({ className, variant, size, ...props }) => {
    const { scrollPrev, canScrollPrev } = useCarousel();
    
    return (
        <Button
            data-slot="carousel-previous"
            variant={variant}
            size={size}
            className={cn("absolute size-8 rounded-full top-1/2 -left-12 -translate-y-1/2", className)}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
            <ArrowLeft />
            <span className="sr-only">Previous slide</span>
        </Button>
    )
}

export const CarouselNext: FC<ComponentProps<typeof Button>> = ({ className, variant, size, ...props }) => {
    const { scrollNext, canScrollNext } = useCarousel();
    
    return (
        <Button
            data-slot="carousel-previous"
            variant={variant}
            size={size}
            className={cn("absolute size-8 rounded-full top-1/2 -right-12 -translate-y-1/2", className)}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        >
            <ArrowRight />
            <span className="sr-only">Next slide</span>
        </Button>
    )
}
