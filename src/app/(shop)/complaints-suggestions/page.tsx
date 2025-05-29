import { Suspense } from "react";
import { ComplaintsCreateForm } from "@/components/shop/complaints-suggestions/complaints-create-form";
import { ComplaintsList } from "@/components/shop/complaints-suggestions/complaints-list";
import { ComplaintsListSkeleton } from "@/components/shop/complaints-suggestions/complaints-list-skeleton";
import type { IPage } from "@/interfaces/components";


export default async function ComplaintsPage({ searchParams }: IPage) {
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
                <ComplaintsCreateForm />
            </section>

                {/* Sección Listado de comentarios */}
            <Suspense key={page} fallback={<ComplaintsListSkeleton/>}>
                <ComplaintsList page={Number(page)}/>
            </Suspense>
        </>
    )
}
