'use server'

import { revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import { CreateComplaintsSchema } from "./validation/complaints-suggestions-schema";


export async function createComplaints(formData: FormData) {
    const session = await auth();
    
    try {
        if (!session || !session.accessToken) throw new Error("Usuario no Autorizado");
        
        const fields = Object.fromEntries(formData.entries());
        const { data, success } = await CreateComplaintsSchema.safeParseAsync(fields);
    
        if (!success) throw new Error("Datos incorrectos");
        
        const { status } = await backend.post("/store/complaints-suggestions/create/", data, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        if (status !== 201) throw new Error("Error del servidor");

        revalidateTag("complaints-data");

        return {
            result: true,
            message: "Comentario publicado"
        }

    } catch (error) {
        console.error("Error en CreateComplaints", error);

        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la publicación del comentario";

        return { result: false, message };
    }
}