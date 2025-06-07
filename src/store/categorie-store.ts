'use client'

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCategories } from "@/actions/categories/get-categories";
import { showErrorToast } from "@/components/ui/sonner";
import type { ICategories } from "@/interfaces/models/categorie.interface";

type State = {
    isLoading: boolean;
    categories: ICategories[];

    setCategories: () => void;
}

export const useCategoriesStore = create<State>()(
    persist((set) => ({
        isLoading: false,
        categories: [],

        async setCategories() {
            const { result, data, error } = await getCategories();

            set({ isLoading: true });

            if (result && data) set({ categories: data });
            else showErrorToast({ title: error! });
            
            set({ isLoading: false });
        },
    }), 
    { name: "categories-data" }
))