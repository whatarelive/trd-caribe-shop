"use server";

import { auth } from "@/auth.config";
import { shopApi } from "@/lib/api/shop-api";

export async function getProducts() {
    try {
        const session = await auth();
        
        const { data } = await shopApi.get(
            "/store/products/?limit=10&offset=0", 
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );   

        return data;
        
    } catch (error) {
        console.log(error);
    }
}