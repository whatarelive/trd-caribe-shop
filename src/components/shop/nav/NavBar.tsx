import Link from "next/link";
import { auth } from "@/auth.config";
import { LayoutDashboard, ShoppingCart, User } from "lucide-react";
import { SideBar } from "@/components/shop/nav/SideBar";

/** 
 * @description Componente de la barra de Navegación de tienda virtual
*/ 
export async function NavBar() {
    // Se extrae la session para verificar su estado 
    const session = await auth();

    return (
        <header className="fixed z-50 min-w-full bg-white shadow-md">
            <nav className="container m-auto flex items-center gap-4 p-4 justify-between md:px-8 md:py-3">
                
                {/* Enlace de la página principal de la tienda */}
                <Link href="/" className="inline-flex items-center gap-1">
                    <h1 className="text-xl font-medium text-amber-500 lg:font-semibold lg:text-2xl">
                        Tienda Caribe
                    </h1>
                </Link>
          
                <div className="flex items-center gap-4">
                    <div className="hidden gap-4 lg:flex">
                        {session?.isAuthenticated ? (
                            <>
                                {/* Enlace al carrito de compras del usuario autentificado */}
                                <Link 
                                    href="/cart/" 
                                    className="group p-2 rounded-md border border-transparent hover:shadow-md hover:border-muted"
                                    about="Página de carrito de compras" 
                                    aria-label="Carrito de compras"
                                >
                                    <ShoppingCart className="min-w-5 min-h-5 group-hover:text-amber-500"/>
                                </Link>

                                {/* Enlace al perfil del usuario autentificado */}
                                <Link 
                                    href="/user/" 
                                    className="group p-2 rounded-md border border-transparent hover:shadow-md hover:border-muted"
                                    about="Página de información del perfil" 
                                    aria-label="Información del perfil"
                                >
                                    <User className="min-w-5 min-h-5 group-hover:text-amber-500"/>
                                </Link>
                                
                                {/* Enlace para navegar al panel de administración (solo si el usuario es admin) */}
                                {session?.user?.isAdmin && (
                                    <Link 
                                        href="/admin/" 
                                        className="group p-2 rounded-md border border-transparent hover:shadow-md hover:border-muted"
                                        about="Página de información del perfil" 
                                        aria-label="Información del perfil"
                                    >
                                        <LayoutDashboard className="min-w-5 min-h-5 group-hover:text-amber-500"/>
                                    </Link>
                                )}
                            </>
                        ) : (
                            <Link 
                                href="/auth/login" 
                                className="p-2 rounded-md bg-blue-500 hover:shadow-md hover:bg-blue-400 transition-colors duration-300"
                                about="Página de inicio de sesión"
                                aria-label="Iniciar Sesión en la plataforma"
                            >
                                <span className="font-medium text-white">
                                    Iniciar Sesión
                                </span>
                            </Link>
                        )}
                    </div>

                    <SideBar 
                        isAuth={session?.isAuthenticated ?? false} 
                        isAdmin={session?.user?.isAdmin ?? false}
                    /> 
                </div>
            </nav>
        </header>
    )
}
