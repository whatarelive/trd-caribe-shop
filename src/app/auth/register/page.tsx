import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";


export default function RegisterPage() {
    return (
        <section className="flex flex-col p-6 w-full max-w-[600px]">
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-semibold mt-4"
                >
                    Crear una cuenta
                </h2>

                <h3 className="text-gray-600 text-center text-sm">
                    Complete el formulario para registrarse en la página
                </h3>
            </div>

            <RegisterForm/>

            <div className="text-center text-sm mt-4">
                <span>¿Ya tienes una cuenta?</span> 
                
                <br />
        
                <Link href="/auth/login" className="text-primary hover:underline cursor-pointer">
                    Inicia sesión aquí
                </Link>
            </div>
        </section>
    );
}
