"use client";

import { FC, useState } from "react";
import { MdDeleteOutline, MdList } from "react-icons/md";
import { Modal } from "@/components/ui/modal";
import { ICategories } from "@/interfaces/models/categorie.interface";

export const ModalListCategorie: FC<{ categories: ICategories[] }> = ({ categories }) => {
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
                                    <span>{ categ.name }</span>

                                    <button 
                                        className="p-2 rounded-md bg-gray-100 text-gray-400 hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer"
                                    >
                                        <MdDeleteOutline size={16}/>
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
