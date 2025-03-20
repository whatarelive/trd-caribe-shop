// Estructura general del módelo de usuario
export interface IUser {
    id: number;
    username: string;
    email: string;
    first_name:	string;
    last_name:	string;
    is_staff: boolean;
}

// Tipo de dato que se va obtener cuando se halla hecho Inicio de sesión 
export type UserLogin = {
    password: string;
} & Pick<IUser, "username">;

// Tipo de dato que se va obtener cuando se halla hecho primero un Registro 
// y luego un Inicio de sesión 
export type UserRegister = {
    token: {
        access: string;
        refresh: string;
    };
} & Omit<IUser, "id" | "is_staff">;
