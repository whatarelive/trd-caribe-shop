import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";


export default function ProductInfoLoading() {
    return (
        <>
            <section className="flex w-full justify-between px-6 md:flex-col md:gap-1.5 lg:px-0">
                <span className="skeleton w-60 h-5 md:h-6 lg:h-7"/>
                <span className="flex bg-neutral-200 rounded-md animate-pulse w-9 h-9 md:hidden"/>
                
                <div className="hidden md:flex md:gap-1">
                    <span className="skeleton w-14 h-4 md:hidden"/>
                    <span className="skeleton w-42 h-4 md:hidden"/>
                    <span className="skeleton w-42 h-4 md:hidden"/>
                </div>
            </section>

            <section className="flex flex-col px-6 mt-8 gap-8 mx-auto xl:flex-row lg:px-0">
                <Card className="p-6 items-center shadow-md">
                    <span className="skeleton w-42 h-4 md:h-6"/>
                    <span className="skeleton w-80 h-72"/>
                </Card>

                <Card className="h-fit gap-0 w-full">
                    <CardHeader className="mb-0">
                        <span className="skeleton w-full h-4 md:h-6"/>
                    </CardHeader>

                    <CardContent className="mt-0">
                        <div className="flex items-center gap-2">
                            <span className="skeleton w-20 h-5"/>
                            <span className="skeleton w-14 h-4"/>
                        </div>

                        <span className="skeleton w-42 h-3 mt-2 mb-4 md:h-4"/>
                        <span className="skeleton w-20 h-3 md:h-4"/>
                        
                        <div>
                            <span className="skeleton w-full h-3 mt-1.5 md:h-4"/>
                            <span className="skeleton w-full h-3 mt-1 md:h-4"/>
                            <span className="skeleton w-44 h-3 mt-1 md:h-4"/>
                        </div>
                    </CardContent>
                        
                    <CardFooter className="mt-6 justify-between">
                        <span className="skeleton w-20 h-9"/>
                        <span className="skeleton w-20 h-10"/>
                    </CardFooter>
                </Card> 
            </section>
        </>
    )
}