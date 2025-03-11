import { shopApi } from "@/src/lib/api/shop-api"
import type { CategoriesGet } from "@/src/types/models";

async function getCategories() {
    try {
        const { data } = await shopApi.get<CategoriesGet>("/store/categories/");

        return data;

    } catch (error) {
        console.log("Error al recuperar las categorías", error);
        
        return null;
    }
}

export {
    getCategories,
}