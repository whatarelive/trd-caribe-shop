import { Card, CardContent } from "@/components/ui/card";


export function UserCardSkeleton() {
    return (
        <Card className="w-full shadow-md bg-gradient-to-br from-white to-gray-50/50">
            <CardContent>
                <div className="flex flex-col items-start gap-3 mb-4">
                    <div className="flex gap-2 w-full items-center">
                        {/* Avatar skeleton */}
                        <span className="skeleton min-h-8 min-w-8 rounded-full" />

                        {/* Nombre skeleton */}
                        <span className="skeleton h-6 w-full" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1 w-full">
                        {/* Email skeleton */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="skeleton h-4 w-4 rounded-full" />
                            <span className="skeleton h-4 w-full" />
                        </div>

                        {/* Username skeleton */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="skeleton h-4 w-4 rounded-full" />
                            <span className="skeleton h-4 w-full" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    {/* Badge skeleton */}
                    <div className="flex justify-center items-center gap-2 w-full h-9">
                        <span className="skeleton h-9 w-full rounded-md" />
                    </div>

                    {/* Button skeleton */}
                    <span className="skeleton h-9 w-9 rounded-md" />
                </div>
            </CardContent>
        </Card>
    )
}
