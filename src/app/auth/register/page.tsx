import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
    return (
        <section className="flex flex-col p-6 w-full max-w-[600px]">
            <div className="flex flex-col items-center md:items-start">
                <h1 className="text-2xl font-bold mt-4">
                    Registro de Usuario
                </h1>

                <h2 className="text-gray-600 text-center md:text-start">
                    Complete el formulario para registrar un nuevo usuario en el sistema
                </h2>
            </div>

            <RegisterForm/>

            <div className="flex flex-col items-center mt-4">
                <span className="text-neutral-700 font-semibold">
                    ¿Ya tienes una cuenta?
                </span>

                <Link href="/auth/login" className="text-blue-600 font-semibold hover:text-blue-500 underlines">
                    Inicia Sesión
                </Link>
            </div>
        </section>
    );
}
