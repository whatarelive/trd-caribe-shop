"use server";

import z from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";
import { shopApi } from "@/lib/api/shop-api";
import type { CreateProductState, IProducts, RequestProduct } from "@/interfaces/models/product.interface";

// Esquema de validación para el formulario de creación de productos
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

/**
 * Crea un nuevo producto 
 * @param _prevState - Estado anterior del formulario (no utilizado)
 * @param formData - Datos del formulario de creación
 * @returns Objeto con errores si falla la validación o la creación, o redirige si es exitoso
 */
export async function createProduct(_prevState: CreateProductState, formData: FormData) {
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());

    // Validar los datos usando Zod schema para asegurar que cumplen con el formato requerido
    const { success, data, error } = CreateProductSchema.safeParse(fields);

    // Si la validación falla, retornar los errores específicos de cada campo
    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
        }
    }

    try {
        // Se recupera la sesión para obtener el token de accesso
        const session = await auth();

        // Intentar crear el producto en el backend mediante una petición POST
        const { status } = await shopApi.post<IProducts, RequestProduct>(
            "/store/products/", 
            data, 
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        // Verificar si la creación fue exitosa (código 201 Created)
        if (status !== 201) {
            throw new Error("Error al crear el producto.");
        } 
        
    } catch (error) {
         // Mensaje de error que se envia al usuario  
        const message = (error as Error).message === "Error al crear el producto" 
            ? [(error as Error).message] 
            : ["Error de conexión"]; 

        // Mensaje de error cuando ocurre un problema en la petición
        return {
            errors: {
                name: message,
                description: message,
                categorie: message,
                price: message,
                stock: message
            },
        }
    }    

    // Se limpia el cache de la página principal de productos
    revalidatePath("/admin/products");
    // se redirecciona al usuario a la página principal de productos 
    redirect("/admin/products");
}