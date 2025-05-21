'use server'

import { revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";


export async function deleteComplaints(id: number) {
    const session = await auth();

    try {
        if (typeof id !== "number" || id <= 0) throw new Error("ID invalido");
        if (!session || !session.accessToken) throw new Error("Usuario no Autorizado");

        const { status } = await backend.delete(`/store/complaints-suggestions/${id}/`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        if (status < 200 || status >= 300) throw new Error("Error del servidor");
          
        revalidateTag("complaints-data");

        return {
            result: true,
            message: "Comentario eliminado exitosamente",
        };
        
    } catch (error) {
        console.error("Error en DeleteComplaints", error);

        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la eliminación del comentario";

        return { result: false, message };
    }
}