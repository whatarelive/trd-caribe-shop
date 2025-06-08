function ProductCardSkeleton() {
    return (
        <li className="max-w-72 h-fit gap-2 z-0 bg-white rounded-md shadow-md hover:cursor-pointer hover:shadow-lg">
            <div className="flex animate-pulse rounded-t-md bg-neutral-200 w-72 h-72"/>

            <div className="flex flex-col p-3 gap-2">
                <span className="skeleton w-full h-6"/>
                <span className="skeleton w-32 h-5"/>

                <div className="mt-2 flex items-center gap-2">
                    <span className="skeleton w-12 h-5"/>
                    <span className="skeleton w-12 h-5"/>
                </div>
            </div>

            <div className="flex p-3 pt-0 justify-between">
                <span className="skeleton w-20 h-9"/>
                <span className="skeleton w-20 h-9"/>
            </div>
        </li>
    )
}

export function ProductListSkeleton() {
    return (
        <ul className="flex flex-wrap gap-6 justify-center w-fit mb-8">
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
        </ul>
    )
}
