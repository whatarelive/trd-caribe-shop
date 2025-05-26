'use server'

import { auth } from "@/auth.config";
import { API_URL } from "@/config/constants";
import type { UserResponse } from "@/interfaces/models/user.interface";

interface Props {
    page: number;
    limit: number;
    search?: string;
}

export async function getUsers({ page, limit, search }: Props) {
    const session = await auth();
    
    try {
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado");
        }

        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: ((page - 1) * limit).toString(),
            ...(search && { search }),
        });

        const response = await fetch(`${API_URL}/user/users?${params}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 900,
                tags: ["users-data"],
            }
        });

        if (!response.ok) throw new Error("Error en el servidor");

        const data: UserResponse = await response.json();

        return {
            result: true,
            count: data.count,
            data: data.results,
        };

    } catch (error) {
        console.error("Error en GetUsers", error);

        return {
            result: false,
            error: (error instanceof Error) ? error.message : "Fallo la carga de los usuarios",
        }
    }
}