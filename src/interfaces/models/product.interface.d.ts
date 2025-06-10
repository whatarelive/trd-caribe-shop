// Interfaz base del módelo productos
interface ProductBase {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  discount: boolean;
  created: string;
  updated: string;
}

// Estructura del objeto que se renderiza en la UI.
export interface ProductClient extends ProductBase {
  categorie: string;     // Nombre de categoría
  finalPrice: number;    // Precio final con descuento
  imageId: string;       // ID de la imagen
  imageUrl: string;      // URL de la imagen
}

// Estructura del objeto que se recibe desde la API.
export interface ProductFromAPI extends ProductBase {
  categorie: string;
  final_price: number;
  image_id: string;
  image_url: string;
}

// Estructura del objeto que se envia hacia la API.
export interface ProductToAPI extends Pick<ProductBase, "name" | "description" | "price" | "stock"> {
  categorie: number;
  image: File;
}

// Estructura del objeto de la petición de listar productos desde la API.
export interface ProductResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductFromAPI[];
}