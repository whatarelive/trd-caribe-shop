
export function SaleItemSkeleton() {
    return (
        <li className="space-y-2 pb-3 border-b">
            <div className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                    <span className="skeleton w-32 h-4"/>
                    <span className="skeleton w-20 h-3.5 mt-1.5"/>
                </div>
                <span className="skeleton w-16 h-5"/>
            </div>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                    <span className="skeleton w-14 h-4"/>
                    <span className="skeleton w-6 h-5 min-[390px]:w-28"/>
                </div>
                <span className="skeleton w-13 h-4"/>
            </div>
        </li>
    )
}
