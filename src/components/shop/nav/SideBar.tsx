'use client'

import clsx from "clsx";
import Link from "next/link";
import { memo, useEffect, useState, type FC } from "react";
import { Bookmark, LayoutDashboard, Menu, MessageSquareTextIcon, ShoppingCart, User, X } from "lucide-react";
import { useCategoriesStore } from "@/store/categorie-store";
import { ButtonLogout } from "@/components/global/ButtonLogout";
import { Button, buttonVariants } from "@/components/ui/button";

interface Props {
    isAuth: boolean;
    isAdmin: boolean;
}

/** 
 * @description Componente de la barra de lateral para la navegación en
 * dispositivos moviles y tables 
*/ 
export const SideBar: FC<Props> = memo(({ isAuth, isAdmin }) => {
    const [isOpen, setIsOpen] = useState(false);
    const categories = useCategoriesStore((state) => state.categories);

    // Función para cerrar el sidebar si se cambia el viewport
    const handleResize = () => {
        if (window.innerWidth >= 1024 && isOpen) {
            document.body.style.overflow = "auto";
            setIsOpen(false);
        }
    };

    // useEffect para manejar el overflow del body cuando cambia el estado
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; 
            window.addEventListener("resize", handleResize); 
        } else {
            document.body.style.overflow = "auto";  
        }
        
        return () => {
            document.body.style.overflow = "auto";  
            window.removeEventListener("resize", handleResize);
        }
    }, [isOpen]);

    
    return (
        <>
            {/* Boton para abrir el menú */}
            <Button 
                id="menu-button"
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="h-8 w-8 lg:hidden"
                aria-label="Abrir menú"
            >
                { isOpen ? <X size={24}/> : <Menu size={24}/> }
            </Button>

            {/* Overlay de fondo */}
            <div 
                id="overlay"
                className={clsx(
                    "fixed inset-0 bg-black z-40 transition-opacity duration-300 lg:hidden",
                    {
                        "opacity-30 visible": isOpen, 
                        "opacity-0 invisible": !isOpen 
                    }
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Barra lateral */}
            <div 
                className={clsx(
                    "fixed right-0 top-0 w-9/12 bg-white z-50 overflow-y-auto transform transition-transform duration-300 sm:w-2/5 lg:hidden",
                    { "translate-x-full" : !isOpen }
                )} 
                style={{ height: "100dvh" }}
            >

                {/* Encabezado de la barra lateral */}
                <div className="flex p-5 justify-between items-center bg-blue-500">
                    <h2 className="text-white text-xl font-medium">
                        Tienda Caribe
                    </h2>

                    {/* Botón de cerrar barra lateral */}
                    <Button 
                        id="close-button" 
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        aria-label="Cerrar menú" 
                    >
                        <X className="text-white min-w-5 min-h-5"/>
                    </Button>
                </div>

                {/* Menú de Navegación */}
                <div className="flex flex-col relative" style={{ height: "80dvh" }}>
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Páginas de la plataforma
                        </h3>

                        <nav className="space-y-4 px-2">
                            <Link href="/user/" className="sidebar-link" about="Página de perfil de usuario">
                                <User size={20} />
                                Perfil de usuario
                            </Link>

                            <Link href="/cart/" className="sidebar-link" about="Página de carrito de compras">
                                <ShoppingCart size={20}/>
                                Carrito de compras
                            </Link>

                            <Link href="/comments/" className="sidebar-link" about="Página de comentarios">
                                <MessageSquareTextIcon size={20}/>
                                Comentarios
                            </Link>

                            {isAdmin && (
                                <Link href="/admin/" className="sidebar-link" about="Página de panel de administración">
                                    <LayoutDashboard size={20}/>
                                    Administración
                                </Link>
                            )}

                            {/* Sección con los botones de sesión */}
                            {isAuth ? (
                                <ButtonLogout />
                            ) : (
                                <Link 
                                    href="/auth/login" 
                                    className={buttonVariants({ className: "h-11 w-full" })}
                                    about="Página de inicio de sesión"
                                    aria-label="Iniciar Sesión en la plataforma"
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </nav>
                    </div>

                    <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Categorías de Productos
                        </h3>           

                        <nav className="flex flex-col gap-4 px-2">
                            {categories.map(({ id, name }) => (
                                <Link 
                                    key={id} 
                                    className="sidebar-link"
                                    href={`/${name.toLowerCase()}/`} 
                                >
                                    <Bookmark size={20}/>
                                    { name }
                                </Link>
                            ))}
                        </nav>             
                    </div>
                </div>
            </div>
        </>
    )
})