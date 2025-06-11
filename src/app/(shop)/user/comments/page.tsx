import { Suspense } from "react";
import { getUserComments } from "@/actions/comments/get-user-comments";
import { CommentsList } from "@/components/shop/comments/comments-list";
import { CommentsListSkeleton } from "@/components/shop/comments/comments-list-skeleton";
import type { IPage } from "@/interfaces/components";


export default async function UserCommentsPage({ searchParams }: IPage) {
    const { page = "1" } = await searchParams;
    const params = { page: Number(page), limit: 8, ordering: "-created" }

    return (
        <>
            <section className="container mx-auto my-12 px-6 text-center md:px-0">
                <h2 className="text-xl font-bold lg:text-3xl">
                    Comentarios Realizados
                </h2>

                <p className="mt-2 mb-4 text-muted-foreground text-sm lg:text-base">
                    Todos los comentarios que has compartido sobre nuestro servicio
                </p>
            </section>

            {/* Sección Listado de comentarios */}
            <Suspense key={page} fallback={<CommentsListSkeleton/>}>
                <CommentsList
                    isUser={true} 
                    page={Number(page)} 
                    action={getUserComments.bind(null, params)}
                />
            </Suspense>
        </>
    )
}
