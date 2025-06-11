'use client'

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";


export const SessionHandler = () => {
    const { data: session } = useSession();
    
    useEffect(() => {
        if (session && session.error) {
            signOut({ redirect: true, redirectTo: "/auth/login" })
                .then(() => showSuccessToast({ title: "Sesión Expirada" }))
                .catch(() => showErrorToast({ title: "Sesión Erronea" }));
        }
    }, [session, session?.error]);

    return null;
}
