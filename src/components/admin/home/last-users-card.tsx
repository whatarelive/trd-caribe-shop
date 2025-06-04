import Link from "next/link";
import { getUsers } from "@/actions/users/get-users"
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export async function LastUsersCard() {
    const users = await getUsers({ page: 1, limit: 5, ordering: "-id" });

    return (
        <Card className="shadow-md grow md:min-w-md">
            <CardHeader>
                <CardTitle>Usuarios Recientes</CardTitle>
                <CardDescription>
                    Listado con los usuarios registrados recientemente en la plataforma este mes.
                </CardDescription>
            </CardHeader>

            <CardContent className="h-full">
                {users.data && users.result && users.count > 0 ? (
                    <ul className="space-y-4">
                        {users.data.map((user, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2 justify-start">
                                    <Avatar>{user.fullName.slice(0, 2)}</Avatar>
                                    
                                    <div className="flex flex-col">
                                        <h3 className="text-sm font-medium">
                                            {user.fullName}
                                        </h3>
                                     
                                        <span className="text-xs">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>

                                <Badge 
                                    className="inline-flex h-fit" 
                                    variant={user.isAdmin ? "success" : "destructive"}
                                >
                                    {user.isAdmin ? "admin" : "cliente"}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center">
                        <h3 className="font-semibold text-xl">
                            {`<Información no disponible/>`}
                        </h3>
                        <p className="text-sm">
                            {users.error ?? "No se pudo cargar los últimos usuarios"}
                        </p>
                    </div>
                )}
            </CardContent>

            <CardFooter>
                <Link 
                    href="/admin/users?page=1" 
                    className={buttonVariants({ variant: "outline", className: "w-full" })}
                >
                    Gestionar Usuarios
                </Link>
            </CardFooter>        
        </Card>
    )
}
