"use client";

import Link from 'next/link';
import { FC, useActionState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { createProduct } from '@/actions/products/create-product';
import { useFormError } from '@/lib/hooks/useFormError';
import { TextInput } from '@/components/ui/input/input-text';
import { FileInput } from '@/components/ui/input/input-file';
import { SelectCategories } from '@/components/admin/products/select-categories';
import type { CreateProductState } from '@/interfaces/models/product.interface';
import type { ICategories } from '@/interfaces/models/categorie.interface';

interface Props {
    categories: ICategories[];
}

export const CreateProductForm: FC<Props> = ({ categories }) => {
    const initialState: CreateProductState = { errors: {} };
    const [errorMessage, formAction, isPending] = useActionState(createProduct, initialState);
    const { showErrors, handleFocus } = useFormError({ errors: errorMessage });

    return (
        <form action={formAction} className="flex flex-col mt-6 w-full md:bg-gray-50 md:p-6 md:rounded-lg">
            <TextInput 
                label="Nombre del producto" 
                type="text" 
                name="name" 
                placeholder="Ingrese el nombre"
                aria-describedby="name-error"
                onFocus={handleFocus}
                errors={showErrors ? errorMessage.errors?.name : undefined}
            />

            <div className="flex gap-2">
                <SelectCategories 
                    label="Categoría" 
                    name="categorie"
                    id="categorie" 
                    categories={categories}
                    aria-describedby="categorie-error"
                    onFocus={handleFocus}
                    errors={showErrors ? errorMessage.errors?.categorie : undefined}
                />

                <Link href="/admin/categories/create" className="button-primary h-10 mt-6">
                    <IoAddOutline size={24}/>
                </Link>
            </div>

            <TextInput 
                label="Descripción del producto" 
                type="text"
                name="description"
                placeholder="Ingrese la descripción del producto"
                aria-describedby="description-error"
                onFocus={handleFocus}
                errors={showErrors ? errorMessage.errors?.description : undefined}
            />

            <div className="flex flex-col md:flex-row gap-4">
                <TextInput 
                    label="Cantidad exitente" 
                    type="number"
                    name="stock"
                    min={0} 
                    placeholder="Ingrese la cantidad existente"
                    aria-describedby="stock-error"
                    onFocus={handleFocus}
                    errors={showErrors ? errorMessage.errors?.stock : undefined}
                />

                <TextInput 
                    label="Precio del producto" 
                    type="number" 
                    name="price"
                    min={0} 
                    placeholder="Ingrese el precio"
                    aria-describedby="price-error"
                    onFocus={handleFocus}
                    errors={showErrors ? errorMessage.errors?.price : undefined}
                />
            </div>

            <FileInput label="Imagen del producto" name="image"/>

            <button 
                type="submit" 
                className="button-primary h-12 mt-4"
                disabled={isPending}
            >
                {
                    isPending 
                        ? <span className="loader"></span> 
                        : 'Crear producto'
                }
            </button>
        </form>
    )
}
