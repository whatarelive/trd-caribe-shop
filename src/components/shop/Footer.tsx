import Link from "next/link";
import { MdEmail, MdPhone } from "react-icons/md";

export const Footer = () => {
    return (
        <footer className="w-full bg-gray-500">
            <div className="max-w-7xl py-8 md:py-12 mx-auto">
                <div className="grid grid-cols-1 gap-8 text-white md:grid-cols-2 lg:grid-cols-4">    
                    <div>
                        <h3 className="text-2xl font-semibold">Tienda Caribe</h3>
                        <p className="mt-2 text-sm text-gray-100">
                            Tu tienda online de confianza para encontrar los mejores productos al mejor precio.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium">Contactanos</h3>
                        <ul className="mt-2 space-y-2 text-sm text-gray-100">
                            <li className="flex gap-1.5 items-center">
                                <MdPhone size={20}/>
                                +53 54213212
                            </li>
                            <li className="flex gap-1.5 items-center">
                                <MdEmail size={20}/>
                                <a href="" target="_blank">
                                    ventas@trdcaribeshop.com
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-medium">Enlaces rápidos</h3>
                        <ul className="mt-2 space-y-2 text-sm text-gray-100">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-foreground">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/" className="text-muted-foreground hover:text-foreground">
                                    Categorías
                                </Link>
                            </li>
                            <li>
                                <Link href="/complaints-suggestions" className="text-muted-foreground hover:text-foreground">
                                    Comentarios
                                </Link>
                            </li>
                        </ul>
                    </div>
                
                    <div>
                        <h3 className="text-lg font-medium">Nos interesa tu opinión</h3>

                        <Link 
                            href="/complaints-suggestions" 
                            className="inline-flex bg-amber-400 px-4 py-2 mt-2 font-medium rounded-md hover:bg-amber-500"
                        >
                            Dejar comentario
                        </Link>
                    </div>
                </div>
            </div>

            <div className="py-6 bg-gray-600">
                <p className="text-sm text-white text-center">
                    © {new Date().getFullYear()} Tienda Caribe. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    )
}
