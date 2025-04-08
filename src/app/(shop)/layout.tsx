import { Footer } from "@/components/shop/Footer";
import { NavBar } from "@/components/shop/NavBar";
import type { ILayout } from "@/interfaces/components";

export default function ShopLayout({ children }: ILayout) {
    return (
        <>
            <NavBar/>
          
            <main className="relative w-full min-h-screen mt-20 xl:gap-8 bg-gray-50 select-all">
                { children }
            </main>
            
            <Footer/>
        </>
    )
}
