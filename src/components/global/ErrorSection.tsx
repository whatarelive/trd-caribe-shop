import { Search, Database, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";


// Tipos de dato de los parametros del componente.
interface Props {
  variant: "search" | "data" | "error";
  className?: string;
}

// Variantes del error.
const variantConfig = {
    search: {
        icon: <Search className="h-12 w-12 text-gray-400" />,
        title: "No se encontraron resultados",
        description: "No pudimos encontrar ningún elemento que coincida con tu búsqueda. Intenta con otros términos.",
    },
    data: {
        icon: <Database className="h-12 w-12 text-gray-400" />,
        title: "No hay datos disponibles",
        description: "No se encontró información para mostrar en este momento.",
    },
    error: {
        icon: <AlertCircle className="h-12 w-12 text-red-400" />,
        title: "Error al cargar los datos",
        description: "Ocurrió un problema al cargar la información. Por favor, intenta nuevamente.",
    }
}

// Componente principal
export function ErrorSection({ variant, className }: Props) {
  const config = variantConfig[variant];

    return (
        <Card className={`w-full rounded-md ${className}`}>
            <CardContent className="flex flex-col items-center justify-center py-24 md:py-12 px-6 text-center">
                {/* Icono */}
                <div className="mb-4">{config.icon}</div>
                {/* Título */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{config.title}</h3>
                {/* Descripción */}
                <p className="text-sm text-gray-600 mb-6 max-w-md">{config.description}</p>
            </CardContent>
        </Card>
    )
}
