import { getComplaints } from "@/actions/complaints-suggestions/get-complaints-suggestions";
import { ErrorSection } from "@/components/global/ErrorSection";
import { ComplaintsCard } from "@/components/shop/complaints-suggestions/complaints-card";
import { Pagination } from "@/components/ui/pagination";


export async function ComplaintsList({ page }: { page: number }) {
    const complaints = await getComplaints({ page, limit: 8 });

    if (!complaints.result || !complaints.count || complaints.error) {
        return (
            <ErrorSection 
                variant="error" 
                className="bg-transparent border-none shadow-none"
            />
        )
    }

    if (complaints.count === 0) {
        return (
            <ErrorSection 
                variant="data" 
                className="bg-transparent border-none shadow-none"
            />
        )
    }
    
    return (
        <section className="flex flex-col py-4 mb-8 gap-8 max-w-7xl mx-auto w-full">
            <ul className="list-none space-y-5">
                {complaints.data.map((complaint) => (
                    <ComplaintsCard key={complaint.id} complaint={complaint}/>
                ))}
            </ul>

            <Pagination 
                count={complaints.count} 
                currentPage={page} 
                className="hidden lg:flex"
                limit={8}
            />
        </section>
    )
}
