import { Suspense } from "react";
import { CommentsCreateForm } from "@/components/shop/comments/comments-create-form";
import { CommentsList } from "@/components/shop/comments/comments-list";
import { CommentsListSkeleton } from "@/components/shop/comments/comments-list-skeleton";
import type { IPage } from "@/interfaces/components";


export default async function CommentsPage({ searchParams }: IPage) {
    const { page = "1" } = await searchParams;

    return (
        <>
            <section className="container mx-auto py-8 text-center">
                <h2 className="text-3xl font-bold">
                    Comentarios de nuestros clientes
                </h2>

                <p className="mt-2 mb-4 text-muted-foreground">
                    Descubre lo que opinan nuestros clientes sobre nuestros productos
                </p>

                {/* Formulario de creación de comentarios */}
                <CommentsCreateForm />
            </section>

            {/* Sección Listado de comentarios */}
            <Suspense key={page} fallback={<CommentsListSkeleton/>}>
                <CommentsList page={Number(page)}/>
            </Suspense>
        </>
    )
}
