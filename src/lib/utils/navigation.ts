export interface Breadcrumb {
    label: string;
    href: string;
}

// Mapeo de rutas en inglés a español
const pathTranslations: Record<string, string> = {
    'products': 'Productos',
    'promotions': 'Promociones',
    'categories': 'Categorías',
    'settings': 'Configuración',
    'sales': 'Ventas',
    'users': 'Usuarios',
};

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
        }

        breadcrumbs.push({
            label,
            href: currentPath
        });
    });

    return breadcrumbs;
} 