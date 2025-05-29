import { Mail, RotateCcwKey, Shield, User, Users } from "lucide-react";
import { updateUserRole } from "@/actions/users/update-user-role";
import { AlertModal } from "@/components/global/AlertModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { IUser } from "@/interfaces/models/user.interface";


export function UserCard({ user }: { user: IUser }) {
    return (
        <Card className="w-full shadow-md bg-gradient-to-br from-white to-gray-50/50">
            <CardContent>
                <div className="flex flex-col items-start gap-3 mb-4">
                    <div className="inline-flex gap-2 items-center">
                        <Avatar className="h-12 w-12 border-2 border-gray-100">
                            { user.first_name.slice(0, 2) }
                        </Avatar>

                        <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1 line-clamp-2">
                            {`${user.first_name} ${user.last_name}`}
                        </h3>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="truncate">{user.email}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="truncate">{user.username}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <Badge className="flex justify-center gap-2 w-full h-9" variant={user.is_staff ? "success" : "destructive"}>
                        {user.is_staff ? (
                            <>
                                <Shield className="h-4 w-4" />
                                Administrador
                            </>
                        ) : (
                            <>
                                <Users className="h-4 w-4" />
                                Cliente
                            </>
                        )}
                    </Badge>

                    <AlertModal
                        title="Cambio de Rol"
                        message={`¿Desea cambiar el rol de ${user.is_staff ? "administrador" : "cliente"} al usuario ${user.username}?`}
                        action={updateUserRole.bind(null, user.id, user.username)}
                    >
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            <RotateCcwKey className="h-4 w-4 text-gray-600" />
                        </Button>
                    </AlertModal>
                </div>
            </CardContent>
        </Card>
    )
}
