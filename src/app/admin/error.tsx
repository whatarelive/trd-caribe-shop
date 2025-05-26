'use client'

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
    const { back } = useRouter()

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="text-center max-w-md mx-auto">
                <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto relative">
                        <span className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse"/>
                        <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                            <span className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
                                !
                            </span>
                        </div>
                    </div>

                    <span className="absolute -top-4 -left-4 w-6 h-6 bg-yellow-400 rounded-full animate-bounce delay-100"/>
                    <span className="absolute -top-2 -right-6 w-4 h-4 bg-pink-400 rounded-full animate-bounce delay-300"/>
                    <span className="absolute -bottom-2 -left-6 w-5 h-5 bg-green-400 rounded-full animate-bounce delay-500"/>
                    <span className="absolute -bottom-4 -right-4 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-700"/>
                </div>

                <div className="mb-4">
                    <span className="text-6xl font-black text-transparent bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text tracking-tight">
                        Oops
                    </span>
                </div>

                <h1 className="text-2xl font-bold text-slate-800 mb-3">Algo salió mal</h1>

                <p className="text-slate-600 mb-8 leading-relaxed">
                    No pudimos cargar los datos que solicitaste.
                    <br />
                    <span className="text-sm">Intenta nuevamente en unos momentos.</span>
                </p>

                <Button
                    onClick={() => back()}
                    className="font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl"
                    size="lg"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Regresar
                </Button>
            </div>
        </div>
    )
}