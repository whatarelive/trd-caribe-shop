"use client";

import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { TextInput } from "@/components/ui/input/input-text";
import { Modal } from "@/components/ui/modal";

export const ModalCreateCategorie = () => {
    const [view, setView] = useState(false);
    const [formData, setFormData] = useState({ categorie: "" });
    // const [error, setError] = useState<string[]>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        // await formAction(formData);
        setView(false);   
    }

    return (
        <div>
            <button type="button" className="button-primary h-10 mt-6" onClick={() => setView(true)}>
                <MdAdd size={24}/>
            </button>

            {view && (
                <Modal rootID="modal-create-categorie" onDismiss={() => setView(false)}>
                    <h3 className="text-xl font-medium text-start w-full">
                        Crear Nueva Categoría
                    </h3>

                    <form onSubmit={handleSubmit} className="w-full mt-6">
                        <TextInput 
                            label="Nombre de la categoría" 
                            type="text" 
                            name="categorie" 
                            value={formData.categorie}
                            onChange={(e) => setFormData({ categorie: e.target.value })}
                            placeholder="Ingrese la nueva categoría"
                            aria-describedby="categorie-error"
                            // onFocus={handleFocus}
                            // errors={showErrors ? errorMessage.errors?.name : undefined}
                        />

                        <button 
                            type="submit" 
                            className="button-primary w-full h-12 mt-4"
                            // disabled={isPending}
                        >
                            {/* {
                                isPending 
                                    ? <span className="loader"></span> 
                                    : 'Crear Categoría'
                            } */}
                            Crear categoría
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    )
}
