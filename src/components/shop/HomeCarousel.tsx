"use client";

import Image from "next/image";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { AutoPlay, Pagination } from "@egjs/flicking-plugins";

import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/pagination.css";

const _plugins = [new AutoPlay(), new Pagination({ type: "bullet" })];

export const HomeCarousel = () => {
    return (
        <section className="relative max-w-7xl h-96 mx-auto mt-8">
            <Flicking
                align="prev"
                circular={true}
                plugins={_plugins}
            >
                <div>
                    <Image 
                        src="/images/imagen_carousel_1.webp" 
                        alt="Imagen #1 del carousel" 
                        width={1280} height={360} 
                        className="object-fill max-w-7xl max-h-90 rounded-lg"
                    />
                </div>
                <div>
                    <Image 
                        src="/images/imagen_carousel_2.png" 
                        alt="Imagen #2 del carousel" 
                        width={1280} height={360} 
                        className="object-fill max-w-7xl max-h-90 rounded-lg"
                    />
                </div>
                <div>
                    <Image 
                        src="/images/imagen_carousel_3.jpg" 
                        alt="Imagen #1 del carousel"
                        width={1280} height={360} 
                        className="object-fill max-w-7xl max-h-90 rounded-lg"
                    />
                </div>
                
                <ViewportSlot>
                    <div className="flicking-pagination"/>
                </ViewportSlot>
            </Flicking>
        </section>
    )
}
