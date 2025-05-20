"use server"

import { auth } from "@/auth.config";
import type { UserResponse } from "@/interfaces/models/user.interface";

interface Props {
    page: number;
    limit: number;
    search?: string;
}

export async function getUsers({ page, limit, search }: Props) {
    const session = await auth();
    
    try {
        if (!session || !session.user || !session.user.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unauthorized_Access" });
        }

        const url = search ? `&search=${search}` : "";
        const offset = (page - 1) * limit;

        const response = await fetch(`/user/users?limit=${limit}&offset=${offset}${url}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`,
            },
            cache: "no-store",
            next: {
                revalidate: 900,
                tags: ["users-data"],
            }
        });

        const data: UserResponse = await response.json();

        return {
            count: data.count,
            results: data.results,
        };

    } catch (error) {
        return {
            error: (error as Error).cause !== "Unauthorized_Access" 
                ? "Fallo la carga de los usuarios" 
                : (error as Error).message,
        }
    }
}