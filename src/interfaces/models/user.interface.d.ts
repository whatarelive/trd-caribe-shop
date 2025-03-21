// Estructura general del módelo de usuario
export interface IUser {
    id: number;
    username: string;
    email: string;
    first_name:	string;
    last_name:	string;
    is_staff: boolean;
}

// Tipo de dato para el estado de la acción de inicio de sesión
export type LoginState = {
    errors?: {
        username?: string[];
        password?: string[];
    };
};

// Tipo de dato para el estado de la acción de registro de usuario
export type RegisterState = {
    errors?: {
        first_name?: string[];
        last_name?: string[];
        username?: string[];
        email?: string[];
        password?: string[];
        passwordConfirm?: string[];
    };
};

// Tipo de dato que se va obtener cuando se halla hecho Inicio de sesión 
export type UserLogin = {
    password: string;
} & Pick<IUser, "username">;

// Tipo de dato del cuerpo de la petición de la acción de registro
export type RequestRegister = {
    password: string;
} & Omit<IUser, "id" | "is_staff">

// Tipo de dato que se va obtener cuando se halla hecho primero un Registro 
// y luego un Inicio de sesión 
export type UserRegister = {
    readonly token: {
        access: string;
        refresh: string;
    };
} & Omit<IUser, "id" | "is_staff">;

export type ResquestLogout = {
    readonly refresh: string | undefined;
}
