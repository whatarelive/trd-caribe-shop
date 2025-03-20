export interface IProducts {
    id: number;
    categorie: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    discount: string;
    created: string;
    updated: string;
    image?: string;
    image_url: string;
    image_id: string;
}

export type ProductsPost = Omit<IProducts, "id" | "discount" | "created" | "updated">
