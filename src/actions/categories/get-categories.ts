import { shopApi } from "@/lib/api/shop-api";

export async function getCategories() {
    try {
        const { data } = await shopApi.get("/store/categories/");

        return data;

    } catch (error) {
        console.log("Error al recuperar las categorías", error);
        
        return null;
    }
}