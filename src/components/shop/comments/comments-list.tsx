import { getComments } from "@/actions/comments/get-comments";
import { ErrorSection } from "@/components/global/ErrorSection";
import { CommentsCard } from "@/components/shop/comments/comments-card";
import { Pagination } from "@/components/ui/pagination";


export async function CommentsList({ page }: { page: number }) {
    const comments = await getComments({ page, limit: 8, ordering: "-created" });

    if (!comments.result || !comments.count || comments.error) {
        return (
            <ErrorSection 
                variant="error" 
                className="bg-transparent border-none shadow-none"
            />
        )
    }

    if (comments.count === 0) {
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
                {comments.data.map((comment) => (
                    <CommentsCard key={comment.id} comment={comment}/>
                ))}
            </ul>

            <Pagination 
                count={comments.count} 
                currentPage={page} 
                className="hidden lg:flex"
                limit={8}
            />
        </section>
    )
}
