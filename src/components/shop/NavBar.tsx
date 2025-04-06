import Link from "next/link";
import { auth } from "@/auth.config";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { ButtonOpenSidebar } from "../ui/buttons";

export const NavBar = async () => {
    const session = await auth();

    return (
        <header className="flex items-center px-6 py-2 justify-between bg-white shadow-2xl shadow-black/20">
            <Link href="/" className="text-xl font-medium hover:text-blue-400">
                <h1>Tienda Caribe</h1>
            </Link>

            <nav className="hidden gap-2 lg:flex">
                <Link href="/" className="hover:bg-gray-50 hover:text-blue-400 rounded-md p-1 px-3">
                    Inicio
                </Link>
                <Link href="/categories/" className="hover:bg-gray-50 hover:text-blue-400 rounded-md p-1 px-3">
                    Categorías
                </Link>
                <Link href="/complaints-suggestions/" className="hover:bg-gray-50 hover:text-blue-400 rounded-md p-1 px-3">
                    Comentarios
                </Link>
            </nav>

            <div className="hidden gap-4 lg:flex">
                <Link href="/search/" className="hover:bg-gray-50 hover:text-blue-400 rounded-md p-2">
                    <MdSearch size={24}/>
                </Link>

                {
                    !session?.isAuthenticated ? (
                        <>
                            <Link href="/cart/" className="hover:bg-gray-50 hover:text-blue-400 rounded-md p-2">
                                <MdOutlineShoppingCart size={24}/>
                            </Link>
                            <Link href="/user" className="hover:bg-gray-50 hover:text-blue-400 rounded-md p-2" about="Información del perfil" aria-label="Información del perfil">
                                <BsPersonCircle size={24}/>
                            </Link>
                        </>
                    ) : (
                        <Link href="/auth/login" className="bg-blue-500 py-2 px-3 text-white rounded-md hover:bg-blue-400">
                            Iniciar Sesión
                        </Link>
                    )
                } 
            </div>

            <ButtonOpenSidebar/>
        </header>
    )
}
