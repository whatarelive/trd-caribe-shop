import z from "zod";

export const PromotionsCreateSchema = z.object({
    name: z.string(),
    porcentage: z.coerce.number(),
    choice: z.enum(["greater", "less", "between"]),
    min_value: z.coerce.number().min(0).optional(),
    max_value: z.coerce.number().min(1).optional(),

}).refine((data) => data.choice === "less" && data.max_value,  { 
    path: ["choice"],
}).refine((data) => data.choice === "greater" && data.min_value, {
    path: ["choice"],
}).refine((data) => data.choice === "between" && data.max_value && data.min_value && data.max_value > data.min_value, {
    path: ["choice"],
});
