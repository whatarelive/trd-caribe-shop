"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { shopApi } from "@/src/lib/api/shop-api";
import { CreateProductSchema } from "@/src/lib/validations/product-schema";
import type { CreateProductState } from "@/src/types/actions-props";
import type { IProducts, ProductsPost } from "@/src/types/models";

async function getProducts() {
    try {
        const session = await auth();

        const { data } = await shopApi.get("/store/products/?limit=10&offset=0", {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
            }
        });   

        return data;
        
    } catch (error) {
        console.log(error);
    }
}

async function createProduct(_prevState: CreateProductState, formData: FormData) {
    const fields = Object.fromEntries(formData.entries());

    const { success, data, error } = CreateProductSchema.safeParse(fields);

    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
            message: "Error de Creación del producto",
        }
    }

    try {
        const session = await auth();

        const response = await shopApi.post<IProducts, ProductsPost>(
            "/store/products/", 
            data, 
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.data) {
            throw new Error("Error al crear el producto.");
        }

        revalidatePath("/admin/products");
        redirect("/admin/products");

    } catch (error) {
        console.log("Fallo la creación de la imagen", error);

        return {
            errors: {},
            message: "Error al crear la cuenta"
        }
    }    
}

export { 
    getProducts,
    createProduct
};
