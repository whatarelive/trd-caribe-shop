// Estructura base del módelo de comentario
interface Comment {
    id: number;	
    text: string;
    user: string;
    active: boolean;
    created: string;
}

// Estructura general del módelo de la respuesta al comentario.
export interface ResponseComment {
    username: string;
    response: string;
}

// Estructura del objeto que se recibe desde la API.
export interface CommentFromAPI extends Comment {
    upate: string;
};

// Estructura del objeto que se renderiza en la UI.
export interface CommentClient extends Comment {
    update: string;
};

// Estructura del objeto que se envia hacia la API.
export type CommentToAPI = Pick<Comment, "text" | "active">;

// Estructura del objeto de la petición de listar comentarios desde la API.
export type CommentsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: CommentFromAPI[];
}