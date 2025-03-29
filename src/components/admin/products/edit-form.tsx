"use client";

import { FC, useRef, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
// import { useFormError } from '@/lib/hooks/useFormError';
import { TextInput } from '@/components/ui/input/input-text';
import { ModalCreateCategorie } from '@/components/admin/categories/modal-create';
import { ModalListCategorie } from '@/components/admin/categories/modal-list';
import { SelectCategories } from '@/components/admin/products/select-categories';
import type { IProducts } from '@/interfaces/models/product.interface';
import type { ICategories } from '@/interfaces/models/categorie.interface';

interface Props {
    product: IProducts;
    categories: ICategories[];
}

export const EditProductForm: FC<Props> = ({ product, categories }) => {
    // const initialState: CreateProductState = { errors: {} };

    const [image, setImage] = useState<string | undefined>(product.image);
    
    // Referencia al input de archivo
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Función para manejar el clic en el botón de carga de imagen
    const handleClick = () => inputRef.current?.click();

    // Función para manejar el cambio en el input de archivo
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file ? file.name : undefined);
    }

    // const [ _errorMessage, formAction, isPending ] = useActionState(
    //     async (_state: CreateProductState, _formData: FormData) => {
    //         return {

    //         };
    //     }, 
    //     initialState
    // );
    
    // const { showErrors, handleFocus } = useFormError({ errors: errorMessage });

    const productCategorie = categories.filter((categ) => categ.name === product.categorie).pop()!;
    const restCategories = categories.filter((categ) => categ.name !== product.categorie);

    return (
        <form 
            // action={formAction} 
            className="flex flex-col mt-6 w-full md:bg-gray-50 md:p-6 md:rounded-lg"
        >
            {/* Sección con las fechas de creación y actualización */}
            <div className="flex flex-col justify-between my-4 md:mt-0 md:flex-row">
                <span>
                    <b className="mr-2">
                        Fecha de creación: 
                    </b>
                    {product.created}
                </span>
                
                <span>
                    <b className="mr-2">
                        Fecha de actualización: 
                    </b>
                    {product.updated ?? "-/-/-"}
                </span>
            </div>
            
            {/* Sección de visualización de los datos */}
            <div className="flex flex-col w-full lg:flex-row lg:gap-4">
                {/* Sección de la Imagen y los datos de fecha */}
                <div className="flex flex-col">
                    <picture>
                        <img 
                            src={image} 
                            alt={`Imagen del producto ${product.name}`} 
                            width={400}
                            height={400}
                            className="w-full h-fit rounded-md md:min-w-[400px]"    
                        />
                    </picture>
                    
                    {/* Boton de acción */}
                    <div className="flex w-full items-center gap-2 mt-3 md:mt-5">
                        <button 
                            type="button" 
                            onClick={handleClick} 
                            className="flex w-full justify-center p-2 rounded-sm border border-neutral-300 items-center gap-2 
                            text-neutral-400 text-sm cursor-pointer hover:bg-green-500 hover:text-white"
                        >
                            
                            <IoCloudUploadOutline size={24} />
                            <span className="hidden lg:block text-sm">Cambiar imagen</span>
                        </button>            
                    </div>
                        
                    {/* Campo de entrada */}
                    <input 
                        type="file" 
                        ref={inputRef}
                        onChange={handleChange} 
                        accept="image/*" 
                        className="hidden" 
                        name="imagen" 
                    />
                </div>

                {/* Sección de los datos modificables del producto */}
                <div className="flex flex-col w-full">
                    <TextInput 
                        label="Nombre del producto" 
                        type="text" 
                        name="name"
                        defaultValue={product.name} 
                        placeholder="Ingrese el nombre"
                        aria-describedby="name-error"
                        // onFocus={handleFocus}
                        // errors={showErrors ? errorMessage.errors?.name : undefined}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
                        <TextInput 
                            label="Descuento del producto" 
                            type="text"
                            name="discount"
                            defaultValue={product.discount} 
                            placeholder="Ingrese el descuento"
                            aria-describedby="discount-error"
                            // onFocus={handleFocus}
                            // errors={showErrors ? errorMessage.errors?.stock : undefined}
                        />
                        
                        <div className="flex gap-2">
                            <SelectCategories 
                                label="Categoría" 
                                name="categorie"
                                id="categorie" 
                                categories={restCategories}
                                aria-describedby="categorie-error"
                                // onFocus={handleFocus}
                                // errors={showErrors ? errorMessage.errors?.categorie : undefined}
                            >
                                <option value={productCategorie.id}>
                                    {productCategorie.name}
                                </option>
                            </SelectCategories>

                            {/* Modal para crear una nueva categoria */}
                            <ModalCreateCategorie/>

                            {/* Modal para listar las categorías */}
                            <ModalListCategorie/>
                        </div>

                        <TextInput 
                            label="Cantidad exitente" 
                            type="number"
                            name="stock"
                            min={0}
                            defaultValue={product.stock} 
                            placeholder="Ingrese la cantidad existente"
                            aria-describedby="stock-error"
                            // onFocus={handleFocus}
                            // errors={showErrors ? errorMessage.errors?.stock : undefined}
                        />

                        <TextInput 
                            label="Precio del producto" 
                            type="number" 
                            name="price"
                            min={0} 
                            defaultValue={product.price}
                            placeholder="Ingrese el precio"
                            aria-describedby="price-error"
                            // onFocus={handleFocus}
                            // errors={showErrors ? errorMessage.errors?.price : undefined}
                        />
                    </div>

                    <TextInput 
                        label="Descripción del producto" 
                        type="text"
                        name="description"
                        defaultValue={product.description}
                        placeholder="Ingrese la descripción del producto"
                        aria-describedby="description-error"
                        // onFocus={handleFocus}
                        // errors={showErrors ? errorMessage.errors?.description : undefined}
                    />
                </div>
            </div>

            {/* Botón para actualizar el prodcuto */}
            <div className="flex justify-end flex-col md:flex-row gap-2 md:gap-4">
                <button 
                    type="submit" 
                    className="button-primary w-full h-12 mt-4"
                    // disabled={isPending}
                >
                    {/* {
                        isPending 
                            ? <span className="loader"></span> 
                            : 'Guardar producto'
                    } */}
                    Guardar Producto
                </button>

                <button 
                    type="button" 
                    className="border border-neutral-400 text-neutral-400 hover:border-red-500 hover:text-red-500 font-medium cursor-pointer w-full p-2 h-12 mt-4"
                >
                    Eliminar Producto
                </button>
            </div>
        </form>
    )
}
