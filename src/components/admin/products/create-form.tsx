'use client'

import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { createProduct } from "@/actions/products/create-product";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ICategories } from "@/interfaces/models/categorie.interface";


export function CreateProductForm({ categories }: { categories: ICategories[] }) {
    const { back } = useRouter();
    
    const [_state, formAction, isPending] = useActionState(
        async (_prev: null | void, formData: FormData) => {
            const { result, message } = await createProduct(formData);
        
            if (result) {
                showSuccessToast({ title: message });
                back();
            }
            else showErrorToast({ title: message });
        }, 
        null
    );

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Crear Producto</CardTitle>
                <CardDescription>
                    Formulario para crear nuevos productos en el sistema
                </CardDescription>
            </CardHeader>
            
            <form action={formAction}>
                <CardContent>
                    <div className="space-y-2 mb-4">
                        <Label htmlFor="name">Nombre del producto</Label>
                        <Input 
                            id="name" 
                            name="name" 
                            type="text" 
                            placeholder="Ingrese el nombre"
                        />
                    </div>

                    <div className="space-y-2 mb-4">
                        <Label htmlFor="image">Imagen del producto</Label>
                        <Input
                            id="image" 
                            name="image" 
                            type="file" 
                            accept="image/*" 
                        />
                    </div>

                    <div className="space-y-2 mb-4">
                        <Label htmlFor="categorie">Categoría del producto</Label>
                        <Select name="categorie">
                            <SelectTrigger className="w-full bg-transparent">
                                <SelectValue placeholder="Seleccionar Categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(({ id, name }) => (
                                    <SelectItem key={id} value={id.toString()}>
                                        { name }
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col w-full md:flex-row gap-4 mb-4">
                        <div className="space-y-2 grow">
                            <Label htmlFor="stock">Cantidad existente</Label>
                            <Input  
                                id="stock"
                                name="stock"
                                type="number"
                                min={0} 
                                placeholder="Ingrese la cantidad existente"
                            />
                        </div>

                        <div className="space-y-2 grow">
                            <Label htmlFor="price">Precio del producto</Label>
                            <Input 
                                id="price"
                                name="price"
                                type="number" 
                                min={0} 
                                placeholder="Ingrese el precio"
                                aria-describedby="price-error"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        <Label htmlFor="description">Descripción del producto</Label>
                        <Textarea 
                            id="description"
                            name="description"
                            placeholder="Ingrese la descripción del producto"
                            className="h-32 md:h-fit"
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end">
                    <Button type="submit" disabled={isPending} className="h-11 w-full md:w-fit">
                        { isPending ? "Guardando" : "Crear Producto" }
                        { isPending && <Loader2 className="w-4 h-4 ml-1 animate-spin"/> }
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
