import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/src/components/auth/login-form";

import styles from "./login.module.css";

export default function LoginPage() {
    return (
        <section className={styles.container}>
            <div className={styles.container_header}>
                <Image 
                    src="/images/logo.png" 
                    alt="Logo de la empresa" 
                    width={200} 
                    height={100}
                    className={styles.logo}
                />

                <h1 className={styles.title}>
                    Iniciar sesión
                </h1>

                <h2 className={styles.subtitle}>
                    Ingrese sus datos para acceder a su cuenta
                </h2>
            </div>

            <LoginForm/>

            <div className={styles.register_container}>
                <span>¿No tienes una cuenta?</span>

                <Link href="/auth/register" className={styles.register_link}>
                    Registrate
                </Link>
            </div>
        </section>
    );
}
