import { z } from "zod";

export const PromotionsCreateSchema = z.object({
    name: z.string().min(3).max(50),
    type: z.enum(["percentage", "fixed"]),
    value: z.coerce.number().min(1).max(100),
    choice: z.enum(["greater", "less", "between"]),
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
})
.refine((data) => data.choice !== "less" || data.maxPrice !== undefined,  { 
    path: ["choice"],
})
.refine((data) => data.choice !== "greater" || data.minPrice !== undefined, {
    path: ["choice"],
})
.refine((data) => {
    if (data.choice === "between") {
        return (
            data.minPrice !== undefined && 
            data.maxPrice !== undefined && 
            data.minPrice < data.maxPrice
        );
    }

    return true;
}, {
    path: ["choice"],
});
