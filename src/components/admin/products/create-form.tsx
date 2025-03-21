"use client";

import Link from 'next/link';
import { FC, useActionState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { createProduct } from '@/actions/products/create-product';
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

    return (
        <form action={formAction} className="flex flex-col mt-6 w-full rounded-md">
            <TextInput 
                label="Nombre del producto" 
                type="text" 
                name="name" 
                placeholder="Ingrese el nombre"
                aria-describedby="name-error"
                errors={errorMessage.errors?.name}
            />

            <div className="flex gap-2">
                <SelectCategories 
                    label="Categoría" 
                    name="categorie"
                    id="categorie" 
                    categories={categories}
                    aria-describedby="categorie-error"
                    errors={errorMessage.errors?.categorie}
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
                errors={errorMessage.errors?.description}
            />

            <TextInput 
                label="Cantidad exitente" 
                type="number"
                name="stock"
                min={0} 
                placeholder="Ingrese la cantidad existente"
                aria-describedby="stock-error"
                errors={errorMessage.errors?.stock}
            />

            <TextInput 
                label="Precio del producto" 
                type="number" 
                name="price"
                min={0} 
                placeholder="Ingrese el precio"
                aria-describedby="price-error"
                errors={errorMessage.errors?.price}
            />

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
