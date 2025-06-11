import { SaleItemSkeleton } from "@/components/shop/sales/skeletons-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function OrderDetailsLoading() {
    return (
         <section className="container mx-auto my-12 p-6">
            <div className="mb-6">
                <span className="skeleton w-52 h-6 lg:w-80 lg:h-8"/>
                <div className="flex gap-3 mt-1.5">
                    <span className="skeleton w-20 h-4"/>
                    <span className="skeleton w-20 h-4"/>
                    <span className="skeleton w-20 h-4"/>
                </div>
            </div>

            <section className="flex flex-col gap-6 lg:flex-row">
                <Card className="grow h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <span className="skeleton w-6 h-6"/>
                            <span className="skeleton w-28 h-5"/>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <SaleItemSkeleton/>
                            <SaleItemSkeleton/>
                            <SaleItemSkeleton/>
                        </ul>
                    </CardContent>
                </Card>

                <section className="w-full space-y-6 lg:max-w-98">
                    <Card>
                        <CardHeader>
                            <span className="skeleton w-48 h-5"/>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between mb-3">
                                <span className="skeleton w-14 h-6"/>
                                <span className="skeleton w-16 h-5"/>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="skeleton w-28 h-4"/>
                                    <span className="skeleton w-36 h-5"/>
                                </div>
                                <span className="skeleton w-20 h-6"/>

                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <span className="skeleton w-44 h-5"/>
                        </CardHeader>     
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="skeleton w-20 h-4"/> 
                                <span className="skeleton w-20 h-4"/> 
                            </div>
                            <div className="flex justify-between">
                                <span className="skeleton w-24 h-4"/> 
                                <span className="skeleton w-14 h-4"/> 
                            </div>                        
                            
                            <span className="skeleton w-full h-0.5"/> 

                            <div className="flex justify-between">
                                <span className="skeleton w-16 h-5"/> 
                                <span className="skeleton w-20 h-5"/> 
                            </div>
                            
                            <span className="skeleton w-full h-11"/> 
                        </CardContent>
                    </Card>
                </section>
            </section>
        </section>
    )
}