// Tipos de datos
export type PromotionType = "percentage" | "fixed";
export type PromotionChoice = "greater" | "less" | "between";

// Estructura base del módelo de promociones
interface PromotionBase {
  id: number;
  name: string;
  choice: PromotionChoice;
}

// Estructura del objeto que se renderiza en la UI.
export interface PromotionClient extends PromotionBase {
  value: number;
  minPrice: number;
  maxPrice: number;
  type: PromotionType;
}

// Estructura del objeto que se recibe desde la API.
export interface PromotionFromAPI extends PromotionBase {
  valor: number;
  min_price: number;
  max_price: number;
  tipo: PromotionType;
}

// Datos para crear/actualizar en API
export interface PromotionCreate {
  name: string;
  value: number;
  type: PromotionType;
  choice: PromotionChoice;
  minPrice?: number;
  maxPrice?: number;
}

// Estructura del objeto que se envia hacia la API.
export interface PromotionToAPI {
  name: string;
  valor: number;
  tipo: PromotionType;
  choice: PromotionChoice;
  min_price?: number;
  max_price?: number;
}

// Respuesta de lista de promociones desde API
export interface PromotionsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PromotionFromAPI[];
}