import { Footer } from "@/components/shop/Footer";
import { NavBar } from "@/components/shop/NavBar";
import type { ILayout } from "@/interfaces/components";

export default function ShopLayout({ children }: ILayout) {
    return (
        <main className="relative w-full min-h-screen xl:gap-8 bg-gray-50">
            <NavBar/>
            { children }
            <Footer/>
        </main>
    )
}
