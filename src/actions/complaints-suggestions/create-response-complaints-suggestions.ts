'use server'

import { revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import { CreateResponseSchema } from "./validation/complaints-suggestions-schema";


export async function createResponseComplaints(formData: FormData) {
    const session = await auth();
    
    try {
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado");
        }

        const fields = Object.fromEntries(formData.entries());
        const { data, success } = await CreateResponseSchema.safeParseAsync(fields);
    
        if (!success) throw new Error("Datos incorrectos");
        
        await backend.post("/store/complaints-suggestions/response/", data, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        revalidateTag("complaints-data");

        return {
            result: true,
            message: "Respuesta del comentario enviada"
        }

    } catch (error) {
        console.error("Error en CreateResponseComplaints", error);

        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo el envio de la respuesta del comentario";

        return { result: false, message };
    }
}