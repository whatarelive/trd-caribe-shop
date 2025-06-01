import { z } from "zod";

// Esquema de validación para el formulario de creación de productos
export const CreateProductSchema = z.object({
    name: z.string().min(1).max(60),
    description: z.string().min(1),
    categorie: z.coerce.number().min(1),
    price: z.coerce.number().positive().min(0),
    stock: z.coerce.number().int().positive().min(0),
    
    image: z.instanceof(File)
        .refine(file => file.size > 0)
        .refine(file => file.type.startsWith("image/")),
});

export const UpdateProductSchema = CreateProductSchema.partial();