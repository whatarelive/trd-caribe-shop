/**
 * Interfaz que define la estructura de un elemento de navegación tipo breadcrumb.
 */
export interface Breadcrumb {
    /** Texto que se mostrará en la interfaz */
    label: string;
    /** URL de destino para la navegación */
    href: string;
}

/**
 * Diccionario de traducciones para los segmentos de ruta.
 * 
 * Mapea los nombres de ruta en inglés a sus equivalentes en español
 * para mostrar breadcrumbs con etiquetas localizadas.
 * 
 * @example
 * URL: /products/categories
 * Breadcrumbs: Inicio > Productos > Categorías
 */
const pathTranslations: Record<string, string> = {
    'admin': 'Resumen',
    'products': 'Productos',
    'create': 'Creación',
    'promotions': 'Promociones',
    'categories': 'Categorías',
    'settings': 'Configuración',
    'sales': 'Ventas',
    'users': 'Usuarios',
};

/**
 * Genera una lista de breadcrumbs basada en la ruta actual.
 * 
 * @param pathname - Ruta actual de la aplicación
 * @returns Array de objetos Breadcrumb con etiquetas traducidas y URLs
 * 
 * Características:
 * - Elimina query params y hash de la URL
 * - Siempre incluye un breadcrumb de inicio
 * - Traduce segmentos de ruta al español usando pathTranslations
 * - Genera etiquetas legibles para rutas sin traducción
 * - Construye URLs acumulativamente
 */
export function generateBreadcrumbs(pathname: string): Breadcrumb[] {
    // Eliminar query params y hash si existen
    const path = pathname.split('?')[0].split('#')[0];
    
    // Dividir el path en segmentos
    const segments = path.split('/').filter(Boolean);
    
    // Siempre incluir el inicio
    const breadcrumbs: Breadcrumb[] = [
        {
            label: 'Inicio',
            href: '/'
        }
    ];

    // Construir los breadcrumbs acumulativamente
    let currentPath = '';
    segments.forEach((segment) => {
        currentPath += `/${segment}`;
        
        // Buscar primero en el mapeo de traducciones
        let label = pathTranslations[segment.toLowerCase()];
        
        // Si no hay traducción, generar una etiqueta legible
        if (!label) {
            label = segment
                // Reemplazar guiones y guiones bajos por espacios
                .replace(/[-_]/g, ' ')
                // Capitalizar cada palabra
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            if (typeof Number(label) === "number") {
                label = "Detalles";
            }
        }

        breadcrumbs.push({
            label: label,
            href: currentPath
        });
    });

    return breadcrumbs;
} 