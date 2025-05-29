import { PaginationSkeleton } from "@/components/admin/pagination-skeleton";
import { Card } from "@/components/ui/card";


export function ComplaintsListSkeleton() {
    return (
        <section className="flex flex-col py-4 mb-8 gap-8 max-w-7xl mx-auto w-full">
            <ul className="list-none space-y-5">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Card key={index} className="flex gap-3 px-4 justify-between shadow-md">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <div className="skeleton h-8 w-8 rounded-full"/>
                                <span className="skeleton h-6 w-24" />
                            </div>

                            <span className="skeleton w-32 h-9"/>
                        </div>
                        
                        <hr className="text-gray-300"/>

                        <div className="flex flex-col gap-2">
                            <span className="skeleton w-full h-6"/>
                            <span className="skeleton w-full h-6"/>
                            <span className="skeleton w-16 h-6"/>
                        </div>
                    </Card>
                ))}
            </ul>

            <PaginationSkeleton/>
        </section>
    )
}