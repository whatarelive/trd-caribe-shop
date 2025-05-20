"use server"

import { auth } from "@/auth.config";
import type { UserResponse } from "@/interfaces/models/user.interface";

interface Props {
    page: number;
    limit: number;
    search?: string;
}

export async function getUsers({ page, limit, search }: Props) {
    const url = search ? `&search=${search}` : "";
    const session = await auth();

    try {
        if (!session || !session.user || !session.user.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unatorized User 401" });
        }

        const response = await fetch(`/user/users?limit=${limit}&offset=${page}${url}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 15,
            }
        });

        const data: UserResponse = await response.json();

        return {
            count: data.count,
            results: data.results,
        };

    } catch (error) {
        return {
            error: (error as Error).cause !== "Unatorized User 401" 
                ? "Fallo la carga de los usuarios" 
                : (error as Error).message,
        }
    }
}