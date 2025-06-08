// Estructura base del módelo de usuario
interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    fullName: string;
    first_name:	string;
    last_name:	string;
    is_staff: boolean;
    isAdmin: boolean;
}

// Estructura base del módelo del Token
interface Token {
    access: string;
    refresh: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    refreshTokenExpires: number;
}

// Estructura del objeto que se renderiza en la UI.
export type UserClient = Omit<User, "first_name" | "last_name" | "is_staff" | "password">;

// Estructura del objeto que se recibe desde la API.
export type UserFromAPI = Omit<User, "fullName" | "isAdmin" | "password">;

// Estructura del objeto que se envía hacia la API.
export type UserFormatAPI = Omit<User, "id" | "fullName" | "isAdmin" | "is_staff">;

// Estructura del objeto de la petición de listar usuarios desde la API.
export type UserResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: UserFromAPI[];
}

// Estructura del objeto de la petición de Registro de usuario y luego un Inicio de sesión.
export type RegisterResponse = {
    readonly token: Pick<Token, "access" | "refresh">;
    is_staff?: boolean;
} & Omit<UserFromAPI, "id" | "is_staff">;

// Estructura del objeto de sesión creado en las peticiones de inicio de sesión devuelta por la API. 
export type LoginResponse = Pick<Token, "access" | "refresh"> & Omit<UserFromAPI, "id">;

// Estructura del objeto de sesión creado por el adapter (loginFronAPI y registerFromAPI). 
export type SessionAuth = Omit<UserClient, "id"> & Omit<Token, "access" | "refresh">;

// Estructura del objeto de con los nuevos tokens después de la petición de renovar.
export type TokenResponse = Pick<Token, "access" | "refresh">;

// Estructura del objeto de con los nuevos tokens después de pasar por el adapter (newTokenFromAPI).
export type TokenAuth = Pick<Token, "accessToken" | "refreshToken">;
