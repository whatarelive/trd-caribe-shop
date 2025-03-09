"use client";

import { TextInput } from '@/src/components/ui/input/input-text';
import { FileInput } from '@/src/components/ui/input/input-file';
import { SelectCategories } from '@/src/components/admin/products/select-categories';

export const CreateProductForm = () => {
    return (
        <form action="" className="flex flex-col mt-6 w-full rounded-md">
            <TextInput 
                label="Nombre del producto" 
                type="text" 
                name="name" 
                placeholder="Ingrese el nombre"
                />

            <SelectCategories 
                label="Categoría" 
                name="category" 
                categories={[{ id:1, name:"Ropa" }, { id:2, name:"Zapatos" }]}
            />

            <TextInput 
                label="Descripción del producto" 
                type="text"
                name="description"
                placeholder="Ingrese la descripción del producto"
            />

            <TextInput 
                label="Cantidad exitente" 
                type="number"
                name="stock"
                min={0} 
                placeholder="Ingrese la cantidad existente"
            />

            <TextInput 
                label="Precio del producto" 
                type="number" 
                name="price"
                min={0} 
                placeholder="Ingrese el precio"
            />

            <TextInput 
                label="Descuento del precio" 
                type="number" 
                name="discount"
                min={0} 
                max={100}
                placeholder="Ingrese el descuento al precio del producto"
            />

            <FileInput label="Imagen del producto"/>

            <button type="submit" className="button-primary h-12 mt-4">
                Crear producto
            </button>
        </form>
    )
}
