import Link from "next/link";
import { Pagination } from "@/components/ui/pagination/pagination";
import { suggestions } from "@/lib/data/suggestions";
import { ComplaintsCard } from "@/components/shop/complaints-suggestions/complaints-card";

export default function ComplaintsPage() {
    return (
        <>
            <section className="max-w-7xl mx-auto w-full mb-8 py-8 text-center">
                <h2 className="text-3xl font-bold">
                    Comentarios de nuestros clientes
                </h2>

                <p className="mt-2 mb-4 text-muted-foreground">
                    Descubre lo que opinan nuestros clientes sobre nuestros productos
                </p>

                <Link href="/complaints-suggestions/create" className="button-primary">
                    Agregar Comentario
                </Link>
            </section>

            {/* Sección Listado de comentarios */}
            <section className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
                <ul className="list-none space-y-6">
                    {
                        suggestions.slice(1,5).map((suggestion) => (
                            <ComplaintsCard key={suggestion.id} suggestion={suggestion}/>
                        ))
                    }
                </ul>

                <div className="mb-16 mt-12">
                    <Pagination totalPages={6} />
                </div>
            </section>
        </>
    )
}
