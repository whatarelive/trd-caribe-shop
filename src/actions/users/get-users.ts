'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import { userFromAPI } from "@/actions/users/adapters/users-adapters";
import type { IFilters } from "@/interfaces/components";
import type { UserResponse } from "@/interfaces/models/user.interface";


export async function getUsers(params: IFilters) {
    try {
        const response = await service.getAll<UserResponse>(
            "/user/users", params, 
            {
                isProtected: true,
                error: "Fallo la carga de los usuarios",
                cache: "force-cache",
                next: {
                    revalidate: 900,
                    tags: ["users-data"],
                },
            }
        );

        return {
            result: true,
            count: response.count,
            data: response.results.map(userFromAPI),
        };

    } catch (error) {
        console.error("Error en GetUsers", error);

        return {
            result: false, 
            error: (error instanceof HttpException) ? error.message : "Error desconocido",
        };
    }
}