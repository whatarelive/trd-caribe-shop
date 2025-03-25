import { create } from "zustand";

export enum Views {
    create =  "create-categorie",
    list = "list categorie",
    null = "none",
}

interface ModalStore {
    viewType: Views.create | Views.list | Views.null;
    setOpen: (view: Views) => void;
    setClose: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
    viewType: Views.null,
    setOpen: (view) => set({ viewType: view }),
    setClose: () => set({ viewType: Views.null }),
}));