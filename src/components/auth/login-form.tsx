"use client";

import { MdOutlinePerson2, MdOutlineLock } from "react-icons/md";
import { TextInput, TextInputWithPassword } from "@/src/components/ui/input";

export const LoginForm = () => {
    return (
        <form action="" className="flex flex-col mt-6">
            <TextInput
                label="Correo"
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese su correo electronico"
                icon={MdOutlinePerson2}
            />

            <TextInputWithPassword
                label="Contraseña"
                id="password"
                name="password"
                placeholder="Ingrese su contraseña"
                icon={MdOutlineLock}
            />

            <button type="submit" className="button-primary mt-4">
                Iniciar sesión
            </button>
        </form>
    )
}