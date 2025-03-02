"use client";

import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { TextInput, TextInputWithPassword } from "@/src/components/ui/input";
import styles from "./auth-form.module.css";

const LoginForm = () => {
    return (
        <form action="" className={styles.form}>
            <TextInput
                label="Correo electronico"
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese su correo electronico"
                icon={MdOutlineEmail}
            />

            <TextInputWithPassword
                label="Contraseña"
                id="password"
                name="password"
                placeholder="Ingrese su contraseña"
                icon={MdOutlineLock}
            />

            <button type="submit" className={styles.form_button}>
                Iniciar sesión
            </button>
        </form>
    )
}

export {
    LoginForm
};