import { z } from "zod";

export const CreateCommentsSchema = z.object({
    text: z.string().min(1).max(200),
});

export const CreateResponseSchema = z.object({
    username: z.string().min(1),
    response: z.string().min(1).max(200),
});