import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export function ProductCardSkeleton() {
    return (
         <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="font-medium line-clamp-2 max-w-3/5">
                    <span className="skeleton w-32 h-6 mb-1"/>
                </CardTitle>
                
                <CardDescription className="text-wrap text-sm line-clamp-3 text-neutral-500">
                    <span className="skeleton w-60 h-4 mb-0.5"/>
                    <span className="skeleton w-60 h-4"/>
                </CardDescription>
            </CardHeader>
            
            <CardContent>
                <div className="flex justify-between">
                    <span className="skeleton w-16 h-6"/>
                    <span className="skeleton w-12 h-5"/>
                </div>

                <div className="flex flex-col justify-start gap-4 mt-3">
                    <span className="skeleton h-14 w-full"/>
                    <span className="skeleton h-12 w-full"/>
                    <span className="skeleton h-12 w-full"/>
                </div>
            </CardContent>

            <CardFooter className="flex gap-3">
                <span className="skeleton h-11 grow"/>
                <span className="skeleton h-11 grow"/>
            </CardFooter>
        </Card>
    )
}
