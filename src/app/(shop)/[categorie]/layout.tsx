import { SessionProvider } from "next-auth/react";
import { CategoriesFilter } from "@/components/shop/categories/categorie-filters";
import type { ILayout } from "@/interfaces/components";


export default function CategoriesLayout({ children }: ILayout) {
    return (
        <section className="container relative mx-auto my-12 md:px-12 lg:flex lg:gap-12 xl:px-0">
            <section className="hidden sticky top-[100px] h-fit lg:block">
                <CategoriesFilter/>
            </section>

            <SessionProvider>
                <section className="w-full">
                    { children }
                </section>
            </SessionProvider>
        </section>
    )
}
