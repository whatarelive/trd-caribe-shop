"use client";

import { useState } from "react";
import { MdDeleteOutline, MdList } from "react-icons/md";
import { Modal } from "@/components/ui/modal";
import { categories } from "@/lib/data/categories";

export const ModalListCategorie = () => {
    const [view, setView] = useState(false);

    return (
        <div>
            <button type="button" className="button-primary h-10 mt-6" onClick={() => setView(true)}>
                <MdList size={24}/>
            </button>

            {view && (
                <Modal rootID="modal-list-categorie" onDismiss={() => setView(false)}>
                    <h3 className="text-xl font-medium text-start w-full">
                        Listado de categorías
                    </h3>

                    <ul className="w-full mt-6 space-y-2">
                        {
                            categories.map((categ) => (
                                <li key={categ.id} className="flex justify-between">
                                    <span className="font-medium">
                                        { categ.name }
                                    </span>

                                    <button 
                                        className="p-2 rounded-md border border-neutral-500 hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer"
                                    >
                                        <MdDeleteOutline size={20}/>
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </Modal>
            )}
        </div>
    )
}
