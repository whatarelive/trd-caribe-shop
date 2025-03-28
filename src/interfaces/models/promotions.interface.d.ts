type PromotionsChoice = "greater" | "less" | "between";

export interface IPromotions {
    id: number;
    name: string;
    porcentage: string;
    choice: PromotionsChoice;
    min_price?: string;
    max_price?: string;
}