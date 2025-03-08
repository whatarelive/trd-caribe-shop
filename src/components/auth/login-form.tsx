"use client";

import { useState } from "react";
import { MdOutlinePerson2, MdOutlineLock, MdOutlineEmail, MdOutlinePublishedWithChanges } from "react-icons/md";
import { TextInput, TextInputWithPassword } from "@/src/components/ui/input";

export const LoginForm = () => {
    const [isEmail, setIsEmail] = useState<boolean>(false);

    return (
        <form action="" className="flex flex-col mt-6">
            <div className="inline-flex items-center gap-2">
                {
                    isEmail ? (
                        <TextInput
                            label="Correo"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Ingrese su correo electronico"
                            icon={MdOutlineEmail}
                        />
                    ) : (
                        <TextInput
                            label="Usuario"
                            id="user"
                            name="user"
                            type="text"
                            placeholder="Ingrese el nombre de usuario"
                            icon={MdOutlinePerson2}
                        />
                    )
                }
                
                <button 
                    type="button" 
                    onClick={() => setIsEmail(!isEmail)}
                    className="h-10 mt-1 p-2 cursor-pointer rounded-sm border border-neutral-300"
                >
                    <MdOutlinePublishedWithChanges />
                </button>
            </div>

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