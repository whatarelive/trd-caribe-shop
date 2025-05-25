'use client'

import { redirect } from "next/navigation";
import { useCallback } from "react";
import { LogOut } from "lucide-react";
import { logout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";


export const ButtonLogout = () => {
    // Función para manejar el cierre de sesión
    const handleClick = useCallback(async() => {
        const { result, message } = await logout();
        
        if (result) {
            showSuccessToast({ title: message });
            redirect("/");
        } 
        else showErrorToast({ title: message });
    }, []);

    return (
        <Button 
            onClick={handleClick} 
            variant="destructive"
            className="relative py-2 px-4 rounded-md cursor-pointer text-black bg-gray-50 shadow-md hover:bg-red-100 
            hover:text-red-500 active:bg-red-100 active:text-red-500 transition-colors max-sm:mx-4 max-xl:shadow-none"
        >
            <LogOut size={24}/>
            Cerrar Sesión
        </Button>
    )
}
