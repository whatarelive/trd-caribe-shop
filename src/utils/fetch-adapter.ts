/**
 * Configuración para las peticiones HTTP
 * @interface RequestConfig
 * @property {string} [baseURL] - URL base para todas las peticiones
 * @property {Record<string, string>} [headers] - Cabeceras HTTP personalizadas
 * @property {Record<string, string>} [params] - Parámetros de consulta URL
 */
type RequestConfig = {
    baseURL?: string;
    headers?: Record<string, string>;
    params?: Record<string, string>;
};

/**
 * Respuesta genérica para las peticiones HTTP
 * @interface FetchResponse
 * @template T - Tipo de datos esperado en la respuesta
 * @property {T} data - Datos de la respuesta
 * @property {number} status - Código de estado HTTP
 * @property {string} statusText - Mensaje de estado HTTP
 * @property {Headers} headers - Cabeceras de la respuesta
 */
type FetchResponse<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: Headers;
};

/**
 * Tipos válidos para el cuerpo de una petición HTTP
 */
type RequestBody = Record<string, unknown> | Array<unknown> | string | number | boolean | null;

/**
 * // Adaptador para realizar peticiones HTTP utilizando la API Fetch
 * @class FetchAdapter
 * @example
 * // Crear una instancia básica
 * const api = new FetchAdapter();
 * 
 * // Crear una instancia con configuración
 * const api = new FetchAdapter({
 *   baseURL: 'https://api.example.com',
 *   headers: {
 *     'Authorization': 'Bearer token'
 *   }
 * });
 */
export class FetchAdapter {
    private baseURL: string;
    private defaultHeaders: Record<string, string>;

    /**
     * Crea una instancia de FetchAdapter
     * @param {RequestConfig} config - Configuración inicial
     */
    constructor(config: RequestConfig = {}) {
        this.baseURL = config.baseURL || '';
        this.defaultHeaders = config.headers || {};
    }

    /**
     * Realiza una petición HTTP genérica
     * @private
     * @template T - Tipo de datos esperado en la respuesta
     * @template D - Tipo de datos a enviar en el cuerpo de la petición
     * @param {string} method - Método HTTP (GET, POST, PUT, DELETE)
     * @param {string} url - URL del endpoint
     * @param {D} [data] - Datos a enviar en el cuerpo de la petición
     * @param {RequestConfig} [config] - Configuración adicional
     * @returns {Promise<FetchResponse<T>>} Respuesta de la petición
     */
    private async request<T, D extends RequestBody = RequestBody>(
        method: string,
        url: string,
        data?: D,
        config: RequestConfig = {}
    ): Promise<FetchResponse<T>> {
        // Construir la url de la petición
        const fullURL = new URL(this.baseURL + url);
        
        // Añadir query params si existen
        if (config.params) {
            Object.entries(config.params).forEach(([key, value]) => {
                fullURL.searchParams.append(key, value);
            });
        }

        // Contruir los headers de la petición
        const headers = {
            'Content-Type': 'application/json',
            ...this.defaultHeaders,
            ...config.headers,
        };

        // Realizar la petición
        const response = await fetch(fullURL.toString(), {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        // Parsear la data 
        const responseData = await response.json().catch(() => null);

        return {
            data: responseData,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        };
    }

    /**
     * Realiza una petición GET
     * @template T - Tipo de datos esperado en la respuesta
     * @param {string} url - URL del endpoint
     * @param {RequestConfig} [config] - Configuración adicional
     * @returns {Promise<FetchResponse<T>>} Respuesta de la petición
     * @example
     * interface User {
     *   id: number;
     *   name: string;
     * }
     * 
     * // Obtener un usuario
     * const response = await api.get<User>('/users/1');
     * console.log(response.data.name);
     * 
     * // Con parámetros de consulta
     * const response = await api.get<User[]>('/users', {
     *   params: { role: 'admin' }
     * });
     */
    async get<T>(url: string, config?: RequestConfig): Promise<FetchResponse<T>> {
        return this.request<T>('GET', url, undefined, config);
    }

    /**
     * Realiza una petición POST
     * @template T - Tipo de datos esperado en la respuesta
     * @template D - Tipo de datos a enviar en el cuerpo de la petición
     * @param {string} url - URL del endpoint
     * @param {D} [data] - Datos a enviar en el cuerpo de la petición
     * @param {RequestConfig} [config] - Configuración adicional
     * @returns {Promise<FetchResponse<T>>} Respuesta de la petición
     * @example
     * interface CreateUserDto {
     *   name: string;
     *   email: string;
     * }
     * 
     * interface User {
     *   id: number;
     *   name: string;
     *   email: string;
     * }
     * 
     * // Crear un usuario
     * const response = await api.post<User, CreateUserDto>('/users', {
     *   name: 'John Doe',
     *   email: 'john@example.com'
     * });
     */
    async post<T, D extends RequestBody = RequestBody>(
        url: string, 
        data?: D, 
        config?: RequestConfig
    ): Promise<FetchResponse<T>> {
        return this.request<T, D>('POST', url, data, config);
    }

    /**
     * Realiza una petición PUT
     * @template T - Tipo de datos esperado en la respuesta
     * @template D - Tipo de datos a enviar en el cuerpo de la petición
     * @param {string} url - URL del endpoint
     * @param {D} [data] - Datos a enviar en el cuerpo de la petición
     * @param {RequestConfig} [config] - Configuración adicional
     * @returns {Promise<FetchResponse<T>>} Respuesta de la petición
     * @example
     * interface UpdateUserDto {
     *   name?: string;
     *   email?: string;
     * }
     * 
     * // Actualizar un usuario
     * const response = await api.put<User, UpdateUserDto>('/users/1', {
     *   name: 'John Updated'
     * });
     */
    async put<T, D extends RequestBody = RequestBody>(
        url: string, 
        data?: D, 
        config?: RequestConfig
    ): Promise<FetchResponse<T>> {
        return this.request<T, D>('PUT', url, data, config);
    }

    /**
     * Realiza una petición DELETE
     * @template T - Tipo de datos esperado en la respuesta
     * @param {string} url - URL del endpoint
     * @param {RequestConfig} [config] - Configuración adicional
     * @returns {Promise<FetchResponse<T>>} Respuesta de la petición
     * @example
     * // Eliminar un usuario
     * const response = await api.delete('/users/1');
     * 
     * // Verificar si se eliminó correctamente
     * if (response.status === 204) {
     *   console.log('Usuario eliminado');
     * }
     */
    async delete<T>(url: string, config?: RequestConfig): Promise<FetchResponse<T>> {
        return this.request<T>('DELETE', url, undefined, config);
    }
}