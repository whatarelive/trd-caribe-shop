import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { ProductsTable } from "@/components/admin/products/products-table";
import { ProductsList } from "@/components/admin/products/products-list";
import { SearchInput } from "@/components/ui/input/input-search";

export default function ProductsPage() {
    return (
        <section className="flex flex-col gap-6 py-8 pl-8 pr-16">
            <h1 className="text-2xl lg:text-2xl font-semibold text-neutral-500">
                Listado de Productos
            </h1>

            <div className="flex gap-2 lg:gap-4">
                <SearchInput placeholder="Buscar producto"/>

                <Link 
                    href="/admin/products/create" 
                    className="inline-flex items-center gap-2 font-normal p-2 lg:p-3 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                    <MdAdd size={24} />
                    
                    <span className="hidden lg:block">
                        Nuevo
                    </span>
                </Link>
            </div>
            
            <ProductsTable />
            
            <div className="lg:hidden">
                <ProductsList />
            </div>
        </section>
    );
}