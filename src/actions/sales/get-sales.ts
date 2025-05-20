"use server"

import { auth } from "@/auth.config";
import type { SalesResponse } from "@/interfaces/models/sales.interface";

interface Props {
    page: number;
    limit: number;
    search?: string;
}

export async function getSales({ page, limit, search }: Props) {
    const session = await auth();
    
    try {
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unauthorized_Access" });
        }

        const url = search ? `&search=${search}` : "";
        const offset = (page - 1) * limit;

        const response = await fetch(`/sales/list?limit=${limit}&offset=${offset}${url}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`,
            },
            cache: "no-store",
            next: {
                revalidate: 900,
                tags: ["sales-data"],
            }
        });

        const data: SalesResponse = await response.json();

        return {
            count: data.count,
            results: data.results,
        };

    } catch (error) {
        return {
            error: (error as Error).cause !== "Unauthorized_Access" 
                ? "Fallo la carga de las ventas" 
                : (error as Error).message,
        }
    }
}