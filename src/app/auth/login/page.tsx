import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/src/components/auth/login-form";

export default function LoginPage() {
    return (
        <section className="flex flex-col p-6 w-full max-w-[400px]">
            <div className="flex flex-col items-center">
                <Image 
                    src="/images/logo.png" 
                    alt="Logo de la empresa" 
                    width={200} 
                    height={100}
                    className="ml-7"
                />

                <h1 className="text-2xl font-bold mt-4">
                    Iniciar Sesión
                </h1>

                <h2 className="text-gray-600 text-center">
                    Ingrese sus datos para acceder a su cuenta
                </h2>
            </div>

            <LoginForm/>

            <div className="flex flex-col items-center mt-4">
                <span className="text-neutral-700 font-semibold">
                    ¿No tienes una cuenta?
                </span>

                <Link href="/auth/register" className="text-blue-600 font-semibold hover:text-blue-500 underline">
                    Registrate
                </Link>
            </div>
        </section>
    );
}
