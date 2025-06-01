// Estructura general del módelo de usuario
export interface IUserAPI {
    username: string;
    password: string;
    email: string;
    first_name:	string;
    last_name:	string;
}

export interface IUser {
    id: number;
    fullName: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

export type UserResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
}

// Tipo de dato que se va obtener cuando se halla hecho Inicio de sesión 
export type UserLogin = {
    password: string;
} & Pick<IUser, "username">;

// Tipo de dato que se va obtener cuando se halla hecho primero un Registro y luego un Inicio de sesión 
export type UserRegister = {
    readonly token: {
        access: string;
        refresh: string;
    };
    is_staff: boolean;
} & Omit<IUserAPI, "password">;
