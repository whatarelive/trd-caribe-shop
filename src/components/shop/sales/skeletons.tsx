import { PaginationSkeleton } from "@/components/admin/pagination-skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";


function SaleUserCardSkeleton() {
    return (
        <Card className="w-full max-w-80 shadow-md">
            <CardHeader className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="skeleton w-9 h-9"/>
                    <span className="skeleton w-20 h-5"/>
                </div>

                <span className="skeleton w-20 h-6"/>
            </CardHeader>

            <CardContent className="h-full">
                <div className="flex justify-between md:flex-col">
                    <div className="flex flex-col justify-between text-sm mb-2 md:flex-row">
                        <span className="skeleton w-20 h-4"/>
                        <span className="skeleton w-16 h-4 mt-1"/>
                    </div>

                    <div className="flex flex-col justify-between text-sm mb-2 md:flex-row">
                        <span className="skeleton w-28 h-4"/>
                        <span className="skeleton w-24 h-4 mt-1"/>
                    </div>
                </div>

                <span className="skeleton w-full h-1"/>

                <div className="flex justify-between items-center mt-6">
                    <span className="skeleton w-14 h-6"/>
                    <span className="skeleton w-20 h-6"/>
                </div>
            </CardContent>

            <CardFooter>
                <span className="skeleton w-full h-9"/>
            </CardFooter>
        </Card>
    )
}

export default function OrdersUserListSkeleton() {
    return (
        <section className="container flex flex-col px-6 mb-12 gap-8 mx-auto w-full lg:px-0">
            <ul className="flex flex-wrap justify-center gap-4">
                <SaleUserCardSkeleton/>
                <SaleUserCardSkeleton/>
                <SaleUserCardSkeleton/>
                <SaleUserCardSkeleton/>
            </ul>
            <PaginationSkeleton/>
        </section>
    )
}