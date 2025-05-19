import { z } from "zod";

export const CategorieCreateSchema = z.object({
    name: z.string().min(1).max(25),
});