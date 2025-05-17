import { Textarea } from "@/components/ui/textarea";
import { TextInput } from "@/components/ui/input/input-text";
import { Pagination } from "@/components/ui/pagination";
import { ComplaintsCard } from "@/components/shop/complaints-suggestions/complaints-card";
import { suggestions } from "@/lib/data/suggestions";

export default function ComplaintsPage() {
    return (
        <>
            <section className="max-w-7xl mx-auto w-full mb-4 py-8 text-center">
                <h2 className="text-3xl font-bold">
                    Comentarios de nuestros clientes
                </h2>

                <p className="mt-2 mb-4 text-muted-foreground">
                    Descubre lo que opinan nuestros clientes sobre nuestros productos
                </p>
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

                <div className="my-8">
                    <Pagination totalPages={6} />
                </div>
            </section>

            <section className="mx-auto mb-16 mt-6 max-w-7xl bg-white rounded-md p-6 shadow-lg">
                <h2 className="text-3xl font-bold">
                    Haz tu comentario
                </h2>

                <p className="mb-4 text-muted-foreground">
                    Danos una comentario como cliente fiel sobre nuestros productos
                </p>

                <form>
                    <TextInput 
                        label="Nombre" 
                        type="text" 
                        name="name" 
                        placeholder="Ingrese su nombre completo"
                        aria-describedby="username-error"
                        // onFocus={handleFocus}
                        // errors={showErrors ? errorMessage.errors?.name : undefined}
                    />
    
                    <Textarea 
                        label="Comentario"
                        name="coment" 
                        placeholder="Ingrese el contenido del comentario"
                    />
    
                    <button 
                        type="submit" 
                        className="button-primary w-full h-12 mt-10"
                        // disabled={isPending}
                    >
                        {/* {
                            isPending 
                                ? <span className="loader"></span> 
                                : 'Crear Comentario'
                        } */}
                        Crear Comentario
                    </button>
                </form>
            </section>
        </>
    )
}
