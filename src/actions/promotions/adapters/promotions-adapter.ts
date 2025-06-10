import type { PromotionClient, PromotionCreate, PromotionToAPI, PromotionFromAPI } from "@/interfaces/models/promotions.interface";

// Adapter para mapear datos de una promoción recibidos desde la API.
export const promotionFromAPI = (promo: PromotionFromAPI): PromotionClient => ({
    id: promo.id,
    name: promo.name,
    type: promo.tipo,
    choice: promo.choice,
    value: Number(promo.valor),
    minPrice: Number(promo.min_price),
    maxPrice: Number(promo.max_price),
});

// Adapter para mapear datos de una promoción que se van a enviar a la API.
export const promotionApiFormat = (promo: PromotionCreate): PromotionToAPI => ({
    name: promo.name,
    choice: promo.choice,
    tipo: promo.type,
    valor: promo.value,
    max_price: promo.maxPrice ?? 0,
    min_price: promo.minPrice ?? 0,
});