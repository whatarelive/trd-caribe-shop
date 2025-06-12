import Link from "next/link";
import { LoadingImage } from "@/components/global/LodingImage";
import { LoginForm } from "@/components/auth/login-form";


export default function LoginPage() {
    return (
        <section className="flex flex-col p-6 w-full max-w-[400px]">
            <div className="flex flex-col items-center">
                <LoadingImage 
                    src="/images/logo.png" 
                    alt="Logo de la empresa" 
                    width={200} 
                    height={100}
                    className="ml-7"
                />

                <h2 className="text-3xl font-semibold mt-4">
                    Bienvenido de Nuevo
                </h2>

                <h3 className="text-gray-600 text-center text-sm">
                    Ingresa tus credenciales para acceder a tu cuenta
                </h3>
            </div>

            <LoginForm/>

            <div className="text-center text-sm mt-4">
                <span>¿No tienes una cuenta?</span>
                
                <br />

                <Link href="/auth/register" className="text-primary hover:underline cursor-pointer">
                    Regístrate aquí
                </Link>
            </div>
        </section>
    );
}
