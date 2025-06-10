import { LoadingImage } from "@/components/global/LodingImage";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const images: string[] = [
    "/images/imagen_carousel_1.webp",
    "/images/imagen_carousel_2.png",
    "/images/imagen_carousel_3.jpg",
];

/** 
 * @description Componente con el carousel publicitario
*/ 
export function AdvertisingCarousel() {
    return (
        <Carousel 
            opts={{ loop: true }}
            className="relative px-4 container max-md:h-48 xl:h-96 mx-auto mt-12 xl:px-0" 
        >
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <LoadingImage 
                                src={image} 
                                alt={`Imagen #${index+1} del carousel`} 
                                width={1280} height={360} 
                                className="object-fill w-full h-44 bg-blue-500 md:h-auto md:max-h-90 rounded-lg"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className="hidden xl:flex"/>
            <CarouselNext className="hidden xl:flex"/>
        </Carousel>
    )
}
