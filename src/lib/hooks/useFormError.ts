import { useEffect, useState } from "react";

// Interfaz para la estructura de mensajes de error
interface Props<T> {
    errors: T; // Objeto opcional que mapea nombres de campos a arrays de mensajes de error
}

/**
 * Hook personalizado para manejar errores del formulario
 * @description Este hook gestiona la visibilidad de los mensajes de error en los campos de texto
 * y el error general y proporciona una función para ocultar errores cuando un campo recibe el foco
 */
export function useFormError<T>({ errors }: Props<T>) {
    // Estado local para controlar la visibilidad de los errores
    const [showErrors, setShowErrors] = useState(false);
    
    // Efecto para reiniciar el estado
    useEffect(() => {
        // Si no hay errores para este campo, no hacer nada
        if (!errors) return;

        // Si hay errores se actualiza el estado
        setShowErrors(true);
    }, [errors])

    // Oculta los mensajes de error cuando un campo recibe el foco
    const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
       event.preventDefault();
       
        // Si no hay errores para este campo, no hacer nada
        if (!errors) return;

        // Ocultar errores al enfocar un campo con errores
        setShowErrors(false);
    }

    return { 
        showErrors,
        handleFocus
    }
}