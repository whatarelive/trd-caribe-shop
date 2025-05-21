'use server'

import { revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import { UpdateComplaintsSchema } from "./validation/complaints-suggestions-schema";


export async function updateComplaints(id: number, formData: FormData) {
    const session = await auth();
    
    try {
        if (typeof id !== "number" || id <= 0) throw new Error("ID invalido");
        if (!session || !session.accessToken) throw new Error("Usuario no Autorizado");
        
        const fields = Object.fromEntries(formData.entries());
        const { data, success } = await UpdateComplaintsSchema.safeParseAsync(fields);
    
        if (!success) throw new Error("Datos incorrectos");
        
        await backend.put(`/store/complaints-suggestions/${id}/`, data, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        revalidateTag("complaints-data");

        return {
            result: true,
            message: "Comentario editado"
        }

    } catch (error) {
        console.error("Error en UpdateComplaints", error);

        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la edición del comentario";

        return { result: false, message };
    }
}