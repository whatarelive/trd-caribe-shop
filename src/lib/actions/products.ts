"use server";

import { auth } from "@/auth";
import { shopApi } from "@/src/lib/api/shop-api";

async function getProducts() {
    try {
        const session = await auth();

        const { data } = await shopApi.get("/store/products/?limit=10&offset=0", {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
            }
        });   

        return data;
        
    } catch (error) {
        console.log(error);
    }
}

export { 
    getProducts 
};
