'use server'

import { isAxiosError } from "axios";
import { auth } from "@/auth.config"
import { backend } from "@/config/api";
import type { IComplaints } from "@/interfaces/models/complaints-suggestions.interface";


export async function getComplaintsInfo(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) throw new Error("ID invalido");
        
        const session = await auth();
        
        if (!session || !session.accessToken) throw new Error("Usuario no Autorizado");

        const { data } = await backend.get<IComplaints>(`/store/complaints-suggestions/${id}/`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        
        return { result: true, data };
        
    } catch (error) {
        console.error("Error en GetComplaints", error);

        let message = "Error desconocido";
        
        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la carga del comentario";

        return { result: false, error: message }
    }
}