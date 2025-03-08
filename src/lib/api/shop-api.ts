import axios from "axios";

export const ShopApi = axios.create({
    baseURL: process.env.BACKEND_URL,
});