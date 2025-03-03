import Link from "next/link";
import { RegisterForm } from "@/src/components/auth/register-form";

import styles from "@/src/app/auth/auth.module.css";

export default function RegisterPage() {
    return (
        <section className={styles.container}>
            <div className={styles.container_header} style={{ alignItems: "start" }}>
                <h1 className={styles.title} style={{ marginLeft: "26px" }}>
                    Registro de Usuario
                </h1>

                <h2 className={styles.subtitle}>
                    Complete el formulario para registrar un nuevo usuario en el sistema
                </h2>
            </div>

            <RegisterForm/>

            <div className={styles.register_container}>
                <span>¿Ya tienes una cuenta?</span>

                <Link href="/auth/login" className={styles.register_link}>
                    Inicia Sesión
                </Link>
            </div>
        </section>
    );
}
