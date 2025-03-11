import { FetchAdapter } from "@/src/lib/utils/fetch-adapter";

/**
 * Instancia global del FetchAdapter con la URL base configurada
 * @const {FetchAdapter}
 */
export const shopApi = new FetchAdapter({
    baseURL: process.env.BACKEND_URL,
}); 