import Link from "next/link";
import { Send, ShoppingBasket, Trash2 } from "lucide-react";
import { auth } from "@/auth.config";
import { deleteUser } from "@/actions/users/delete-users";
import { UpdateUserForm } from "@/components/auth/update-form";
import { AlertModal } from "@/components/global/AlertModal";
import { ButtonLogout } from "@/components/global/ButtonLogout";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default async function UserPage() {    
    const session = await auth();
    const user = session?.user;

    return (
        <section className="container mx-auto px-6 my-12 lg:px-0">
            <Card className="shadow-md w-auto max-w-[425px] mx-auto">
                <CardHeader>
                    <CardTitle>
                        Perfil de Usuario
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-base">
                        Información pública del usuario actual
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 items-center sm:flex-row">
                        <Avatar className="w-20 h-20 text-2xl">
                            {user?.username?.slice(0,2)}
                        </Avatar>

                        <div>
                            <h4 className="sm:text-lg font-medium">
                                {user?.fullName}
                            </h4>
                            <span className="text-sm">
                                @{user?.username}
                            </span>
                            <p className="text-sm">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    
                    <hr />

                    <div>
                        <h5 className="text-sm font-medium sm:text-base">
                            Información extra 
                        </h5>
                        <p className="text-xs text-muted-foreground mb-3 sm:text-sm">
                            Información sobre la actividad del usuario en la tienda.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link 
                                href="/user/orders/" 
                                className="flex h-9 gap-1.5 items-center justify-center grow text-sm font-medium border rounded-md hover:bg-gray-100"
                            >
                                <ShoppingBasket size={16}/>
                                <span>
                                    Mis Compras
                                </span>
                            </Link>
                            <Link 
                                href="/user/comments/" 
                                className="flex h-9 gap-1.5 items-center justify-center grow text-sm font-medium border rounded-md hover:bg-gray-100"
                            >
                                <Send size={16}/>
                                <span>
                                    Mis Comentarios
                                </span>
                            </Link>
                        </div>
                        
                        <div className="mt-4">
                            <ButtonLogout/>
                        </div>
                    </div>

                    <hr />

                    <div>
                        <h5 className="text-sm font-medium sm:text-base">
                            Seguridad 
                        </h5>
                        <p className="text-xs text-muted-foreground mb-3 md:text-sm">
                            Acciones para modificar la cuenta del usuario.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <UpdateUserForm username={user?.username} email={user?.email}/>

                            <AlertModal
                                title="Eliminar la cuenta"
                                message={`¿ Estas seguro que deseas eliminar la cuenta con el nombre de usuario ${user?.username} ?`}
                                action={deleteUser}
                            >
                                <Button variant="outline" className="grow hover:bg-red-500 hover:text-white hover:border-red-500">
                                    <Trash2 size={24}/>
                                    Eliminar Cuenta
                                </Button>
                            </AlertModal>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
