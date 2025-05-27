export type PromotionsChoice = "greater" | "less" | "between";

export interface IPromotions {
    id: number;
    name: string;
    percentage: string;
    choice: PromotionsChoice;
    min_price?: string;
    max_price?: string;
}

export type PromotionsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPromotions[];
}