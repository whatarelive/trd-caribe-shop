"use client";

import { MdOutlinePerson2,  MdOutlineLock } from "react-icons/md";
import { TextInput, TextInputWithPassword } from "@/src/components/ui/input";
import styles from "./auth-form.module.css";

const LoginForm = () => {
    return (
        <form action="" className={styles.form}>
            <TextInput
                label="Usuario"
                id="user"
                name="user"
                type="text"
                placeholder="Ingrese su nombre de usuario"
                icon={MdOutlinePerson2}
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