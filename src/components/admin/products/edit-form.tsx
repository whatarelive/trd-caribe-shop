'use client'

import { memo, useActionState, useMemo, type FC } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { deleteProduct } from "@/actions/products/delete-product";
import { updateProduct } from "@/actions/products/update-product";
import { AlertModal } from "@/components/global/AlertModal";
import { LoadingImage } from "@/components/global/LodingImage";
import { ChangeImageModal } from "@/components/admin/products/change-image-modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ProductClient } from "@/interfaces/models/product.interface";
import type { Categorie } from "@/interfaces/models/categorie.interface";

interface Props {
    product: ProductClient;
    categories: Categorie[];
}

export const EditProductForm: FC<Props> = memo(({ product, categories }) => {
    const [_state, formAction, isPending] = useActionState(
        async (_prev: null | void, formData: FormData) => {
            const { result, message } = await updateProduct(product.id, formData);
        
            if (result) {
                showSuccessToast({ title: message });
            }
            else showErrorToast({ title: message });
        }, 
        null
    );

    const catgID = useMemo(() => {
        return categories.find((catg) => catg.name === product.categorie)?.id
    }, [product]);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Detalles del producto</CardTitle>
                <CardDescription>
                    Formulario para editar los detalles del producto seleccionado.
                </CardDescription>
            </CardHeader>
            
            <form action={formAction}>
                <CardContent>
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
                                <LoadingImage 
                                    src={product.imageUrl ?? "/images/no_data.jpg"} 
                                    alt={`Imagen del producto ${product.name}`} 
                                    width={400}
                                    height={400}
                                    className="w-full h-fit rounded-md md:min-w-[400px]"    
                                />
                            </picture>
                            
                            {/* Campo de entrada */}
                            <ChangeImageModal id={product.id}/>
                        </div>

                        {/* Sección de los datos modificables del producto */}
                        <div className="flex flex-col w-full">
                            <div className="space-y-2 mb-4">
                                <Label htmlFor="name">Nombre del producto</Label>
                                <Input  
                                    id="name"
                                    name="name"
                                    type="text" 
                                    defaultValue={product.name} 
                                    placeholder="Ingrese el nombre"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
                                <div className="space-y-2 mb-4">
                                    <Label htmlFor="discount">Descuento del producto</Label>
                                    <Input 
                                        id="discount"
                                        name="discount"
                                        type="text"
                                        disabled
                                        defaultValue={product.price - product.finalPrice} 
                                        placeholder="Ingrese el descuento"
                                    />
                                </div>
                                
                                <div className="space-y-2 mb-4">
                                    <Label htmlFor="categorie">Categoría del producto</Label>
                                    <Select name="categorie" defaultValue={catgID?.toString()}>
                                        <SelectTrigger className="w-full bg-transparent">
                                            <SelectValue placeholder={product.categorie} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Categorias disponibles</SelectLabel>
                                                {categories.map(({ id, name }) => (
                                                    <SelectItem key={id} value={id.toString()}>
                                                        { name }
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <Label htmlFor="stock">Cantidad exitente</Label>
                                    <Input  
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        min={0}
                                        defaultValue={product.stock} 
                                        placeholder="Ingrese la cantidad existente"
                                    />
                                </div>

                                <div className="space-y-2 mb-4">
                                    <Label htmlFor="price">Precio del producto</Label>
                                    <Input  
                                        id="price"
                                        name="price"
                                        type="number" 
                                        min={0} 
                                        defaultValue={product.price}
                                        placeholder="Ingrese el precio"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <Label htmlFor="description">Descripción del producto</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={product.description}
                                    placeholder="Ingrese la descripción del producto"    
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botón para actualizar el prodcuto */}
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4">
                        <Button type="submit" disabled={isPending} className="h-11">
                            { isPending ? "Guardando" : "Editar producto" }
                            { isPending && <Loader2 className="w-4 h-4 ml-1 animate-spin"/> }
                        </Button>

                        <AlertModal
                            title="Eliminar Producto" 
                            message={`Deseas eliminar el producto ${product.name} de la plataforma`} 
                            action={deleteProduct.bind(null, product.id)} 
                        >
                            <Button type="button" variant="outline" className="h-11">
                                <Trash2 size={24}/>
                                Eliminar Producto
                            </Button>
                        </AlertModal>
                    </div>
                </CardContent>
            </form>
        </Card>
    )
})