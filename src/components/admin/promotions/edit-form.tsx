"use client";

// import { useActionState } from 'react';
// import { useFormError } from '@/lib/hooks/useFormError';
import { type FC, useState } from "react";
import { TextInput } from "@/components/ui/input/input-text";
import { SelectPromotionType } from "./select-promotion-type";
import type { IPromotions, PromotionsChoice } from "@/interfaces/models/promotions.interface";

interface Props {
    promotion: IPromotions;
}

export const EditPromotionForm: FC<Props> = ({ promotion }) => {
    // const initialState: CreateProductState = { errors: {} };
    // const [errorMessage, formAction, isPending] = useActionState(createProduct, initialState);
    // const { showErrors, handleFocus } = useFormError({ errors: errorMessage });

    const [type, setType] = useState<PromotionsChoice>(promotion.choice);

    return (
        <form 
            // action={formAction} 
            className="flex flex-col mt-6 w-full md:bg-gray-50 md:p-6 md:rounded-lg"
        >
            <TextInput 
                label="Nombre de la promoción" 
                type="text" 
                name="name" 
                defaultValue={promotion.name}
                placeholder="Ingrese el nombre de promoción"
                aria-describedby="name-error"
                // onFocus={handleFocus}
                // errors={showErrors ? errorMessage.errors?.name : undefined}
            />

            <div className="flex flex-col md:flex-row gap-4">
                <TextInput 
                    label="Porciento de descuento" 
                    type="text"
                    name="porcentage"
                    defaultValue={promotion.porcentage}
                    placeholder="Ingrese el porciento de descuento"
                    aria-describedby="porcentage-error"
                    // onFocus={handleFocus}
                    // errors={showErrors ? errorMessage.errors?.description : undefined}
                />

                <SelectPromotionType 
                    label="Tipo de Promoción"  
                    value={type} 
                    onChange={(e) => setType(e.target.value as PromotionsChoice)}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                { 
                    type !== "less" && (
                        <TextInput 
                            label="Valor minimo" 
                            type="number"
                            name="min_value"
                            min={0} 
                            defaultValue={promotion.min_price}
                            placeholder="Ingrese el valor minimo"
                            aria-describedby="min_value-error"
                            // onFocus={handleFocus}
                            // errors={showErrors ? errorMessage.errors?.stock : undefined}
                        />
                    )
                }

                {
                    type !== "greater" && (
                        <TextInput 
                            label="Valor máximo" 
                            type="number" 
                            name="max_value"
                            min={0} 
                            defaultValue={promotion.max_price}
                            placeholder="Ingrese el valor máximo"
                            aria-describedby="max_value-error"
                            // onFocus={handleFocus}
                            // errors={showErrors ? errorMessage.errors?.price : undefined}
                        />
                    )
                }
            </div>

            {/* Botones para actualizar o eliminar la promoción */}
            <div className="flex justify-end flex-col md:flex-row gap-2 md:gap-4">
                <button 
                    type="submit" 
                    className="button-primary grow h-12 mt-4"
                    // disabled={isPending}
                >
                    {/* {
                        isPending 
                            ? <span className="loader"></span> 
                            : 'Crear promoción'
                    } */}
                    Guardar promoción
                </button>

                <button 
                    type="button" 
                    className="grow border rounded-md border-neutral-400 text-neutral-400 hover:border-red-500 hover:text-red-500 font-medium cursor-pointer p-2 h-12 mt-4"
                >
                    Eliminar Promoción
                </button>
            </div>
        </form>
    )
}
