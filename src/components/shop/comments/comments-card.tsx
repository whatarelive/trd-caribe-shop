import { Edit2, Trash2 } from "lucide-react";
import { deleteComments } from "@/actions/comments/delete-comments";
import { updateComments } from "@/actions/comments/update-comments";
import { AlertModal } from "@/components/global/AlertModal";
import { CommentsForm } from "@/components/shop/comments/comments-form";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { CommentClient } from "@/interfaces/models/comments.interface";

interface Props {
    isUser?: boolean;
    comment: CommentClient;
}

export function CommentsCard({ isUser, comment }: Props) {
    return (
        <Card className="flex gap-3 justify-between shadow-md">
            <CardContent className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <Avatar>{comment.user.slice(0, 2)}</Avatar>                            
                    
                    <span className="line-clamp-1">
                        {comment.user}
                    </span>
                </div>
                
                <div className="flex gap-6 items-center">
                    <span className={`text-nowrap ${isUser ? "hidden sm:block" : ""}`}>
                        {comment.created}
                    </span>

                    {isUser && (
                        <div className="flex gap-2">
                            <CommentsForm 
                                id={comment.id}
                                title="Editar comentario"
                                description="Deseas cambiar el mensaje de este comentario"
                                action={updateComments}
                            >
                                <Button size="sm">
                                    <Edit2 size={24}/>
                                </Button>
                            </CommentsForm>

                            <AlertModal 
                                title="Eliminar Comentario" 
                                message="Estas seguro que desesa eliminar el siguiente comentario" 
                                action={deleteComments.bind(null, comment.id)}
                            >
                                <Button variant="outline" size="sm" className="hover:bg-red-500 hover:text-white">
                                    <Trash2/>
                                </Button>
                            </AlertModal>
                        </div>
                    )}
                </div>
            </CardContent>

            <hr className="text-gray-300 mx-6"/>
            
            <CardFooter className="relative grow">
                <p className="text-xs md:text-base">
                    {comment.text}
                </p>
            </CardFooter>
        </Card>
    )
}