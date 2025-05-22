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

export interface ProductResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IProducts[];
}