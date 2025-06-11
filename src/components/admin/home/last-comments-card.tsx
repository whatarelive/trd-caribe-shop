import Link from "next/link";
import { getComments } from "@/actions/comments/get-comments";
import { Avatar } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export async function LastCommentsCard() {
    const comments = await getComments({ page: 1, limit: 3, ordering: "-created" });

    return (
        <Card className="shadow-md grow w-full md:min-w-md 2xl:max-w-md">
            <CardHeader>
                <CardTitle>Comentarios Recientes</CardTitle>
                <CardDescription>
                    Listado con los comentarios públicados recientemente en la plataforma este mes.
                </CardDescription>
            </CardHeader>

            <CardContent className="h-full">
                {comments.data && comments.result && comments.count > 0 ? (
                    <ul className="space-y-4">
                        {comments.data.map((comment) => (
                            <li key={comment.id} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="inline-flex items-center gap-2">
                                        <Avatar>{comment.user.slice(0, 2)}</Avatar>
                                        <h3>{comment.user}</h3>
                                    </div>
                                    <span className="text-sm">
                                        {comment.created}
                                    </span>
                                </div>

                                <p className="line-clamp-2 text-sm">
                                    {comment.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center">
                        <h3 className="font-semibold text-xl">
                            {`<Información no disponible/>`}
                        </h3>
                        <p className="text-sm">
                            {comments.error ?? "No se pudo cargar los últimos comentarios"}
                        </p>
                    </div>
                )}
            </CardContent>

            <CardFooter>
                <Link 
                    href="/admin/comments?page=1" 
                    className={buttonVariants({ variant: "outline", className: "w-full" })}
                >
                    Gestionar Comentarios
                </Link>
            </CardFooter>
        </Card>
    )
}
