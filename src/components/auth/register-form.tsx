"use client";

import { MdOutlineLock, MdOutlinePerson2, MdOutlineLockClock } from "react-icons/md";
import { TextInput, TextInputWithPassword } from "@/src/components/ui/input";
import styles from "./auth-form.module.css";

const RegisterForm = () => {
    return (
        <form action="" className={styles.form}>
            <div className={styles.form_inputRow}>
                <TextInput
                    label="Nombre"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ingrese el nombre"
                />

                <TextInput
                    label="Apellidos"
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Ingrese los apellidos"
                />
            </div>

            <TextInput
                label="Usuario"
                id="user"
                name="user"
                type="text"
                placeholder="Ingrese el nombre de usuario"
                icon={MdOutlinePerson2}
            />

            <TextInputWithPassword
                label="Contraseña"
                id="password"
                name="password"
                placeholder="Ingrese su contraseña"
                icon={MdOutlineLock}
            />

            <TextInputWithPassword
                label="Confirmar Contraseña"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Confirme la contraseña"
                icon={MdOutlineLockClock}
            />

            <button type="submit" className={styles.form_button}>
                Registrar Cuenta
            </button>
        </form>
    )
}

export {
    RegisterForm
};