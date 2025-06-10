import { CalendarArrowDown, CalendarArrowUp } from "lucide-react";
import { DataSection } from "@/components/admin/data-section";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TextCommentDialog } from "@/components/admin/comments/text-comment-dialog";
import { CreateResponseForm } from "@/components/admin/comments/create-response-form";
import type { CommentClient } from "@/interfaces/models/comments.interface";


export function CommentsCard({ comment }: { comment: CommentClient }) {
    return (
        <Card className="shadow-md">
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="inline-flex gap-2 items-center">
                    <Avatar>{comment.user.slice(0, 2)}</Avatar>                            
                    <span className="line-clamp-1">{comment.user}</span>
                </CardTitle>

                <Badge variant={comment.active ? "destructive" : "success"}>
                    {comment.active ? "No resuelta" : "Resuelta"}
                </Badge>
            </CardHeader>
            
            <CardContent className="flex gap-3 flex-col sm:flex-row justify-between">
                <DataSection 
                    label="Fecha de Creación:" 
                    value={comment.created} 
                    icon={<CalendarArrowDown size={18} className="text-red-400"/>}
                />
                
                <DataSection 
                    label="Fecha de Respuesta:" 
                    value={comment.update} 
                    icon={<CalendarArrowUp size={18} className="text-green-400"/>}
                />
            </CardContent>
            <CardFooter className="flex gap-2">
                <TextCommentDialog text={comment.text} user={comment.user} />
                <CreateResponseForm user={comment.user} />
            </CardFooter>
        </Card>
    )
}
