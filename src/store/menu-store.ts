import { create } from "zustand";

interface MenuStore {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const useMenuStore = create<MenuStore>()((set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));