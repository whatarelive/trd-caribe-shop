import Link from "next/link";
import { IoAddOutline } from "react-icons/io5";
import { SearchInput } from "@/src/components/ui/input/input-search";

export default function CategoriesPage() {
    return (
        <section className="flex flex-col gap-4 p-8">
            <div className="flex flex-col min-[500px]:flex-row gap-4 justify-between min-[500px]:items-center">
                <h1 className="text-2xl lg:text-3xl font-semibold text-neutral-500">
                    Categorías
                </h1>

                <div className="flex items-center gap-2 lg:gap-4">
                    <SearchInput placeholder="Buscar categoría"/>

                    <Link 
                        href="/admin/categories/create" 
                        className="inline-flex items-center gap-2 font-normal p-2 lg:p-3 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    >
                        <IoAddOutline size={24} />
                        <span className="hidden lg:block">Nueva</span>
                    </Link>
                </div>
            </div>
            
            {/* <div className="hidden lg:block p-4 bg-white rounded-lg mt-6">
                <ProductsTable />
            </div> */}

            {/* <div className="lg:hidden">
                <ProductsList />
            </div> */}
        </section>
    )
}