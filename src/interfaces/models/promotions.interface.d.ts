export type PromotionsType = "percentage" | "fixed";
export type PromotionsChoice = "greater" | "less" | "between";

export interface IPromotionsAPI {
    id: number;
    name: string;
    valor: string;
    tipo: string;
    choice: string;
    min_price?: string;
    max_price?: string;
}

export interface IPromotions extends Pick<IPromotionsAPI, "id" | "name"> {
    value: string;
    type: PromotionsType;
    choice: PromotionsChoice;
    minPrice: string;
    maxPrice: string;
}

export type PromotionsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPromotionsAPI[];
}