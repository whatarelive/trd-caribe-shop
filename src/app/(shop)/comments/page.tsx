import { Suspense } from "react";
import { Send } from "lucide-react";
import { auth } from "@/auth.config";
import { getComments } from "@/actions/comments/get-comments";
import { createComments } from "@/actions/comments/create-commnets";
import { CommentsForm } from "@/components/shop/comments/comments-form";
import { CommentsList } from "@/components/shop/comments/comments-list";
import { CommentsListSkeleton } from "@/components/shop/comments/comments-list-skeleton";
import { Button } from "@/components/ui/button";
import type { IPage } from "@/interfaces/components";


export default async function CommentsPage({ searchParams }: IPage) {
    const session = await auth();
    const { page = "1" } = await searchParams;
    
    const params = { page: Number(page), limit: 8, ordering: "-created" };

    return (
        <>
            <section className="container mx-auto my-12 px-6 text-center">
                <h2 className="text-xl font-bold lg:text-3xl">
                    Comentarios de nuestros clientes
                </h2>

                <p className="mt-2 mb-4 text-sm text-muted-foreground lg:text-base">
                    Descubre lo que opinan nuestros clientes sobre nuestros productos
                </p>

                {/* Formulario de creación de comentarios */}
                {session?.isAuthenticated && (
                    <CommentsForm 
                        title="Haz tu comentario" 
                        description="Danos una comentario como cliente fiel sobre nuestros productos" 
                        action={createComments}
                    >
                        <Button>
                            <Send size={24}/>
                            Publicar Comentario
                        </Button>
                    </CommentsForm>
                )}
            </section>

            {/* Sección Listado de comentarios */}
            <Suspense key={page} fallback={<CommentsListSkeleton/>}>
                <CommentsList 
                    page={Number(page)} 
                    isUser={false} 
                    action={getComments.bind(null, params)}
                />
            </Suspense>
        </>
    )
}
