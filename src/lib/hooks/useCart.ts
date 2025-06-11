'use client'

import { useCallback, useState } from "react";
import { addCart } from "@/actions/cart/add-cart";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";

interface Props {
    id: number;
    stock: number | null;
}

export function useCart({ id, stock }: Props) {
    const [counter, setCounter] = useState(1);

    const increment = () => {
        if(stock && counter >= stock) return;
        setCounter(counter + 1);
    }

    const decrement = () => {
        if (counter === 1) return;
        setCounter(counter - 1);
    }

    const addProductToCart = useCallback(
        async (value: number) => {
            const { result, message } = await addCart({ id, quantity: value });

            if (result) showSuccessToast({ title: message });
            else showErrorToast({ title: message });

            setCounter(1);
        }, 
        [id, stock],
    );
    

    return {
        counter,
        increment,
        decrement,
        addProductToCart
    };
}