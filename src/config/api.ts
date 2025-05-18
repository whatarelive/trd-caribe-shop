import axios from "axios";

// Instancia global de Axios con la URL base configurada
export const backend = axios.create({
    baseURL: process.env.BACKEND_URL,
}); 