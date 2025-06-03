'use client'

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "@/auth.config";
import { HttpException } from "@/lib/error-adapter";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";


export const SessionHandler = () => {
    const { data: session } = useSession();
    
    useEffect(() => {
        if (session && session.error instanceof HttpException) {
            signOut({ redirect: true, redirectTo: "/auth/login" })
                .then(() => showSuccessToast({ title: "Sesión Expirada" }))
                .catch(() => showErrorToast({ title: "Sesión Erronea" }));
        }
    }, [session])

    return null;
}
