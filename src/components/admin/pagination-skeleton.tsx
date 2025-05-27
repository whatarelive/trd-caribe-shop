export function PaginationSkeleton() {
    return (
        <div className="hidden md:flex items-center justify-center">
            <div className="flex items-center space-x-2">
                <span className="skeleton h-8 w-16" />
                <span className="skeleton h-8 w-8" />
                <span className="skeleton h-8 w-8" />
                <span className="skeleton h-8 w-8" />
                <span className="skeleton h-8 w-16" />
            </div>
        </div>
    )
}
