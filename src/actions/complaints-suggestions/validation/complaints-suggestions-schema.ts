import { z } from "zod";

export const CreateComplaintsSchema = z.object({
    text: z.string().min(1).max(200),
});

export const UpdateComplaintsSchema = CreateComplaintsSchema.extend({
    active: z.boolean(),
}).partial();