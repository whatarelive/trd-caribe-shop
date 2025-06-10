import { SessionProvider } from "next-auth/react";
import type { ILayout } from "@/interfaces/components";


export default function ProfileLayout({ children }: ILayout) {
    return (
        <SessionProvider>
            { children }
        </SessionProvider>
    )
}
