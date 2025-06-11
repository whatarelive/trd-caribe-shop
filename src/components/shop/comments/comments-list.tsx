import { ErrorSection } from "@/components/global/ErrorSection";
import { CommentsCard } from "@/components/shop/comments/comments-card";
import { Pagination } from "@/components/ui/pagination";
import type { CommentClient } from "@/interfaces/models/comments.interface";

interface Props {
    page: number;
    isUser: boolean;
    action: () => Promise<{
        result: boolean;
        count?: number;
        data?: CommentClient[];
        error?: string;
    }>
}

export async function CommentsList({ page, isUser, action }: Props) {
    const comments = await action();

    if (!comments.result || comments.error) {
        return (
            <ErrorSection 
                variant="error" 
                className="bg-transparent border-none shadow-none"
            />
        )
    }

    if (comments.count === 0 || !comments.data || !comments.count) {
        return (
            <ErrorSection 
                variant="data" 
                className="bg-transparent border-none shadow-none"
            />
        )
    }
    
    return (
        <section className="container flex flex-col py-4 mb-8 gap-8 px-6 mx-auto">
            <ul className="list-none space-y-5 max-w-5xl w-full mx-auto">
                {comments.data.map((comment) => (
                    <CommentsCard 
                        key={comment.id} 
                        comment={comment} 
                        isUser={isUser}
                    />
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
