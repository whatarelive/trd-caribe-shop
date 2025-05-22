import axios from "axios";
import { API_URL } from "@/config/constants";

// Instancia global de Axios con la URL base configurada
export const backend = axios.create({
    baseURL: API_URL,
}); 