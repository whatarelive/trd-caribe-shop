import { getSalesUser } from "@/actions/sales/get-sales-user";
import { ErrorSection } from "@/components/global/ErrorSection";
import { SaleUserCard } from "@/components/shop/sales/sales-card";
import { Pagination } from "@/components/ui/pagination";
import type { IFilters } from "@/interfaces/components";


export async function SalesUserList({ page }: Pick<IFilters, "page">) {
    const sales = await getSalesUser({ page, limit: 8, ordering: "-id" });

    if (!sales.result || !sales.count || sales.error) {
        return (
            <ErrorSection 
                variant="error" 
                className="bg-transparent border-none shadow-none"
            />
        )
    }

    if (sales.count === 0) {
        return (
            <ErrorSection 
                variant="data" 
                className="bg-transparent border-none shadow-none"
            />
        )
    }

    return (
        <section className="container flex flex-col px-6 mb-12 gap-8 mx-auto w-full lg:px-0">
            <ul className="flex flex-wrap justify-center gap-4">
                {sales.data.map((sale, index) => (
                    <SaleUserCard key={index} sale={sale}/>
                ))}
            </ul>

            <Pagination 
                count={sales.count} 
                currentPage={page} 
                className="hidden lg:flex"
                limit={8}
            />
        </section>
    )
}
