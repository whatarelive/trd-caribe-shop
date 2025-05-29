
// Función auxiliar para formatear la fecha obtenida.
export function format(value: string) {
    // Se crea el objeto date a partir de la cadena de texto
    const date = new Date(value).toISOString();
    // Se elimina la zona horaria del objeto date.
    const fech = date.split('T')[0];
    // Se divide la cadena para obtener por separado el día, mes y año.
    const [year, month, day ] = fech.split("-");
    // Se retorna la fecha con el nuevo formato.
    return `${day} / ${month} / ${year}`;
}