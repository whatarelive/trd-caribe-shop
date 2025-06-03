import { getSession } from "next-auth/react";
import { auth } from "@/auth.config";
import { DuplicatedObjectException, FetchFailedException, NotFoundException, SessionException } from "@/lib/error-adapter";
import type { IFilters } from "@/interfaces/components";

const API_URL = process.env.BACKEND_URL;

interface RequestConfig extends RequestInit {
    isProtected: boolean;
    isFile?: boolean;
    error: string; 
}

type MethodPost = {} & Omit<RequestConfig, "body" | "method">;
type MethodConfig = {} & Omit<MethodPost, "isProtected">;

export class ApiService {
    private static instace?: ApiService;
    private static baseUrl: string;
    
    private constructor() {
        ApiService.baseUrl = API_URL || "";
    }

    private static async getAccessToken() {
        const action = typeof window !== undefined ? auth : getSession;
        return (await action())?.accessToken;
    }

    private static async request(url: string, config: RequestConfig): Promise<Response> {
        config.headers = new Headers(!config.isFile ? { "Content-Type": "application/json" } : {});
        
        if (config.isProtected) {
            const accessToken = await ApiService.getAccessToken();
            config.headers.append("Authorization", `Bearer ${accessToken}`);
        } 

        try {
            const response = await fetch(`${ApiService.baseUrl}${url}`, config);
            
            if (config.isProtected && response.status === 401) {                
                throw new SessionException();
            }
            
            if (!response.ok && response.status === 400 && config.method === "POST") {
                throw new DuplicatedObjectException();
            }

            if (!response.ok && response.status === 404 && config.method !== "POST") {
                throw new NotFoundException();
            }
    
            if (!response.ok || response.status < 200 || response.status >= 400) {
                throw new FetchFailedException(config.error, response.status);
            } 
    
            return response;
            
        } catch (error) {
            console.log("Fetch Error", error);
            throw error;
        }
    }
     
    public async getAll<T>(url: string, params: IFilters | null, config: RequestConfig): Promise<T> {
        let searchParams: URLSearchParams | undefined;

        if (params) {
            const { limit, page, search, ordering } = params;
    
            searchParams = new URLSearchParams({
                limit: limit.toString(),
                offset: ((page - 1) * limit).toString(),
                ...(search && { search }),
                ...(ordering && { ordering }),
            });    
        }

        const response = await ApiService.request(`${url}?${searchParams}`, { 
            ...config, 
            method: "GET",
        });
           
        return await response.json() as T;
    }

    public async getById<T>(url: string, config: RequestConfig): Promise<T> {
        const response = await ApiService.request(url, { 
            ...config, 
            method: "GET", 
        });

        return await response.json() as T;
    } 

    public async post(url: string, data: any, config: MethodPost): Promise<Response> {
        return await ApiService.request(url, { 
            ...config,
            method: "POST",
            body: JSON.stringify(data),
        }); 
    } 

    public async postFile(url: string, data: any, config: MethodPost): Promise<Response> {
        return await ApiService.request(url, { 
            ...config,
            method: "POST",
            body: data,
            isFile: true,
        }); 
    } 

    public async update<T>(url: string, data: any, config: MethodConfig): Promise<T> {
        const response = await ApiService.request(url, { 
            ...config,
            method: "PATCH",
            isProtected: true,
            body: JSON.stringify(data), 
        });

        return await response.json() as T;
    }

    public async delete(url: string, config: MethodConfig): Promise<string> {
        const response = await ApiService.request(url, { 
            ...config,
            method: "DELETE", 
            isProtected: true 
        });

        return await response.text();
    } 

    public static get getInstace(): ApiService {
        if (!ApiService.instace) {
            ApiService.instace = new ApiService();
        }
        
        return ApiService.instace;
    }   
}