import { Footer } from "@/components/shop/Footer";
import { NavBar } from "@/components/shop/nav/NavBar";
import type { ILayout } from "@/interfaces/components";


/** 
 * @description Componente Layout para las páginas de la tienda virtual
*/ 
export default function ShopLayout({ children }: ILayout) {
    return (
        <div className="template-page">
            <NavBar/>
            
            <main className="bg-gray-50 select-text mt-12 lg:mt-14">
                { children }
            </main>
            
            <Footer/>
        </div>
    )
}
