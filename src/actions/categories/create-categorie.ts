"use server"

import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import { CategorieCreateSchema } from "@/actions/categories/validations/categorie-schema";


export async function CreateCategorie(formData: FormData) {
    const fields = Object.fromEntries(formData.entries());
    
    const { data, success } = await CategorieCreateSchema.safeParseAsync(fields);

    if (!success) {
        return {
            result: false,
            message: "Información Incorrecta"
        };
    }

    const session = await auth();

    try {
        if (!session || !session.user || !session.user.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unatorized User 401" });
        }

        await backend.post("/store/categories/create/", { ...data }, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        });
        
    } catch (error) {
        const message = (error as Error).cause !== "" 
            ? "Fallo la creación de la categoría"
            : (error as Error).message;

        return { result: false, message };
    }

    revalidateTag("categories-data");
    revalidatePath("/admin/products/");

    return {
        result: true,
        message: `Categoría ${data.name} creada`,
    }
}