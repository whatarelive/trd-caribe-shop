import type { ILayout } from "@/src/types/components";

export default function AuthLayout({ children }: ILayout) {
    return (
        <main style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            { children }
        </main>
    );
}
