export interface IProduct {
    id: number;
    categorie: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    discount: string;
    created: string;
    updated: string;
    imageUrl: string;
    imageId: string;
}

export interface IProductAPI {
    image: File;
    name: string;
    description: string;
    categorie: number;
    price: number;
    stock: number;
}

export interface ProductResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
}