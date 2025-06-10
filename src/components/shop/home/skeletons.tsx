export function CommentsCarouselSkeleton() {
    return (
        <div className="relative">
            <span className="hidden absolute animate-pulse bg-neutral-200 
                -left-12 top-12 w-8 h-8 rounded-full xl:block"/>

            <ul className="flex justify-between lg:gap-5">
                <li className="hidden skeleton h-32 rounded-lg lg:basis-1/3 xl:basis-1/3"/>
                <li className="hidden skeleton h-32 rounded-lg lg:basis-2/3 xl:basis-1/3"/>
                <li className="skeleton w-full h-32 rounded-lg lg:basis-1/3 xl:basis-1/3"/>
            </ul>

            <span className="hidden absolute animate-pulse bg-neutral-200 
                -right-12 top-12 w-8 h-8 rounded-full xl:block"/>
        </div>
    )
}
