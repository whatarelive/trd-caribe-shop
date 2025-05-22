import { z } from "zod";


export const AddCartSchema = z.object({
    id: z.coerce.number().positive().min(1),
    quantity: z.coerce.number().positive().min(1),
});