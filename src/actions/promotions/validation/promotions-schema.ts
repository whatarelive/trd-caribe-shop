import { z } from "zod";

export const PromotionsCreateSchema = z.object({
    name: z.string().min(3).max(50),
    tipo: z.enum(["percentage", "fixed"]),
    valor: z.coerce.number().min(1).max(100),
    choice: z.enum(["greater", "less", "between"]),
    min_price: z.coerce.number().min(0).optional(),
    max_price: z.coerce.number().min(0).optional(),
})
.refine((data) => data.choice !== "less" || data.max_price !== undefined,  { 
    path: ["choice"],
})
.refine((data) => data.choice !== "greater" || data.min_price !== undefined, {
    path: ["choice"],
})
.refine((data) => {
    if (data.choice === "between") {
        return (
            data.min_price !== undefined && 
            data.max_price !== undefined && 
            data.min_price < data.max_price
        );
    }

    return true;
}, {
    path: ["choice"],
});
