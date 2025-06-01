import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import type { IComments } from "@/interfaces/models/comments.interface";


export function CommentsCard({ comment }: { comment: IComments }) {
    return (
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
    )
}