
export interface CartItem {
    id: number;
    user: string;
}

export interface CartResponse {
    count: number;
    results: CartItem[];
}