import { z } from "zod";

export const AddCartSchema = z.object({
    id: z.coerce.number().positive().min(1),
    quantity: z.coerce.number().positive().min(1),
});

export const CkeckoutSaleSckema = z.object({
    method: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'STRIPE', 'APPLE_PAY', 'GOOGLE_PAY']),
})