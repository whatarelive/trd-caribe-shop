export type PromotionsType = "percentage" | "fixed";
export type PromotionsChoice = "greater" | "less" | "between";

export interface IPromotionsAPI {
    name: string;
    valor: number;
    tipo: string;
    choice: string;
    min_price: number;
    max_price: number;
}

export interface IPromotions {
    id: number;
    name: string;
    value: number;
    type: PromotionsType;
    choice: PromotionsChoice;
    minPrice: number;
    maxPrice: number;
}

export type PromotionsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
}