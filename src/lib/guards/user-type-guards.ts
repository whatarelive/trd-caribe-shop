import type { UserLogin, UserRegister } from "@/interfaces/models/user.interface";

/**
 * Verifica si el usuario es de tipo registro comprobando si tiene token
 * @param user Usuario a verificar
 * @returns true si es un usuario de registro, false si es de login
 */
export function isRegisterUser(user: UserLogin | UserRegister): user is UserRegister {
    return (user as UserRegister).token !== undefined;   
}
