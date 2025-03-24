export interface IProducts {
    id: number;
    categorie: string;
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

export type CreateProductState = {
    errors?: {
        name?: string[];
        description?: string[];
        categorie?: string[];
        price?: string[]; 
        stock?: string[];
    };
}

export type RequestProduct = {
    categorie: number;
} & Pick<IProducts, "description" | "image" | "name" | "price" | "stock">
