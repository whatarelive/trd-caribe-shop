import type { ILayout } from "@/src/types/components";

export default function AuthLayout({ children }: ILayout) {
    return (
        <main className="flex items-center justify-center min-h-screen">
            { children }
        </main>
    );
}
