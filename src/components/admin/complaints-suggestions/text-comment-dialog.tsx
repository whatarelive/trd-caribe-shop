import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Modal from "@/components/ui/dialog";

interface Props {
    user: string;
    text: string;
}

export function TextCommentDialog({ user, text }: Props) {
    return (
        <Modal.Dialog>
            <Modal.DialogTrigger asChild className="grow">
                <Button>
                    <MessageSquareText size={24}/>
                    <span className="md:hidden">Leer</span>
                </Button>
            </Modal.DialogTrigger>
            <Modal.DialogContent>
                <Modal.DialogHeader>
                    <Modal.DialogTitle>
                        Comentario
                    </Modal.DialogTitle>
                    <Modal.DialogDescription>
                        Comentario publicado por el usuario {user} en la plataforma
                    </Modal.DialogDescription>
                </Modal.DialogHeader>

                <div className="p-2 bg-gray-100 rounded-md">
                    <p className="text-sm">{text}</p>
                </div>

                <Modal.DialogFooter>
                    <Modal.DialogClose variant="outline">
                        Cancelar
                    </Modal.DialogClose>
                </Modal.DialogFooter>
            </Modal.DialogContent>
        </Modal.Dialog>
    )
}
