import axios from "axios";

// Instancia para las peticiones que necesitan un token.
export const shopApi = axios.create({
    baseURL: process.env.BACKEND_URL,
})