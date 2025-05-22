export interface ICategories {
    id: number;
    name: string;
    created: string;
    updated: string;
}

export type CategoriesResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: ICategories[];
}