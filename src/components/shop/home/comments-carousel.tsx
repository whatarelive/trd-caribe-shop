import { getComments } from "@/actions/comments/get-comments";
import { ErrorSection } from "@/components/global/ErrorSection";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


export async function CommentsCarousel() {
    const comments = await getComments({ page: 1, limit: 10, ordering: "-created" });

    if (!comments.result || comments.error || !comments.data) {
        return <ErrorSection variant="data"/>
    }

    return (
        <Carousel 
            opts={{ loop: true }}
            className="relative px-6 container xl:h-96 mx-auto mt-12 xl:px-0" 
        >
            <CarouselContent>
                {comments.data.map((comment) => (
                    <CarouselItem key={comment.id}>
                        <div className="p-1">
                           <Card className="flex gap-3 px-4 justify-between shadow-md">
                                <div className="flex justify-between">
                                    <div className="flex gap-2 items-center">
                                        <Avatar>{comment.user.slice(0, 2)}</Avatar>                            
                                        <span className="line-clamp-1">{comment.user}</span>
                                    </div>
                    
                                    <span className="text-nowrap">
                                        {comment.created}
                                    </span>
                                </div>
                                
                                <hr className="text-gray-300"/>
                    
                                <div className="relative grow">
                                    <p className="">{comment.text}</p>
                                </div>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className="hidden xl:flex"/>
            <CarouselNext className="hidden xl:flex"/>
        </Carousel>
    )
}
