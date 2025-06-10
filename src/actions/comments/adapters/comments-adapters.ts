import { format } from "@/lib/format-date";
import type { CommentFromAPI, CommentClient, CommentToAPI, ResponseComment } from "@/interfaces/models/comments.interface";

// Adapter para mapear los datos de un comentario recibidos desde la API.
export const commentsFromAPI = (comment: CommentFromAPI): CommentClient => ({
    id: comment.id,
    user: comment.user,
    text: comment.text,
    active: Boolean(comment.active),
    created: format(comment.created),
    update: comment.active ?  "-- / -- / --" : format(comment.upate),
});

// Adapter para mapear los datos de un comentario que se va a enviar a la API.
// Estructura condicional para peticiones POST y PATCH.
export const commentsFormatAPI = (comment: Partial<CommentToAPI>): Partial<CommentToAPI> => ({
    ...(comment.text && { text: comment.text }),
    ...(comment.active !== undefined && { active: Boolean(comment.active) }),
});

// Adapter para mapear los datos de la respuesta de un comentario que se va a enviar a la API.
export const responseFormatAPI = (response: ResponseComment): ResponseComment => ({
    username: response.username,
    response: response.response,
})