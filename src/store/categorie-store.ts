'use client'

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCategories } from "@/actions/categories/get-categories";
import { showErrorToast } from "@/components/ui/sonner";
import type { Categorie } from "@/interfaces/models/categorie.interface";

type State = {
    isLoading: boolean;
    categories: Categorie[];

    setCategories: () => void;
    getCategorieId: (name: string) => { id?: number };
}

export const useCategoriesStore = create<State>()(
    persist((set, get) => ({
        isLoading: false,
        categories: [],

        async setCategories() {
            const { result, data, error } = await getCategories();

            set({ isLoading: true });

            if (result && data) set({ categories: data });
            else showErrorToast({ title: error! });
            
            set({ isLoading: false });
        },

        getCategorieId(name) {
            const { categories } = get();

            const initial = name.substring(0, 1).toUpperCase();
            const rest = name.substring(1, name.length);
            const nameFormat = `${initial}${rest}`;
            
            const categorie = categories.filter((catg) => catg.name.includes(nameFormat))[0];

            return {
                id: categorie?.id,
            }
        },
    }), 
    { name: "categories-data" }
))