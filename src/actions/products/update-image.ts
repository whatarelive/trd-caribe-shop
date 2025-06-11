'use server'

import { revalidatePath, revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { UpdateImageSchema } from "./validations/products-schema";
import { productFormatAPI } from "./adapters/product-adapters";


export async function updateImage(id: number, formData: FormData) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }

        const fields = Object.fromEntries(formData.entries());
        const { success, data } = await UpdateImageSchema.safeParseAsync(fields);
        
        if (!success) throw new BadRequestException();

        const response = await service.updateFile(`/store/products/update/${id}`, 
            productFormatAPI(data),
            { 
                error: "Fallo la actualización de la imagen del producto",
            }
        );

        console.log({ response });

        revalidateTag("products-data");
        revalidatePath(`/admin/products/${id}/`);

        return {
            result: true,
            message: "Imagen del producto actualizada",
        };
        
    } catch (error) {
        console.error("Error en UpdateImage", error);
        
        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}