import z from "zod";

const CreateProductSchema = z.object({
    name: z.string()
        .min(1, "El nombre del producto es requerido")
        .max(60, "El nombre no puede exceder los 60 caracteres"),
    description: z.string()
        .min(1, "La descripción del producto es requerida"),
    categorie: z.coerce.number()
        .min(1, "Debe seleccionar una categoría válida"),
    price: z.coerce.number()
        .positive("El stock tiene que ser un número positivo")
        .min(0, "El precio no puede ser negativo"),
    stock: z.coerce.number()
        .int("El stock debe ser un entero")
        .positive("El stock tiene que ser un número positivo")
        .min(0, "El stock no puede ser negativo"),
})

export {
    CreateProductSchema,
}