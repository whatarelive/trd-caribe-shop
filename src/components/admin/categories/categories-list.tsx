'use client'

import { Trash2 } from "lucide-react";
import { deleteCategorie } from "@/actions/categories/delete-categorie";
import { CreateCategorieForm } from "@/components/admin/categories/create-form";
import { AlertModal } from "@/components/global/AlertModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Categorie } from "@/interfaces/models/categorie.interface";


export function CategoriesList({ categories }: { categories: Categorie[] }) {
    return (
        <Card className="max-w-sm w-full h-fit">
            <CardHeader>
                <CardTitle>Categorías</CardTitle>
                <CardDescription>
                    Listado de categorías disponibles para cada uno de los productos en el sistema.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex h-full">
                <ul className={`w-full space-y-2 ${categories.length > 6 ? "overflow-y-scroll h-64 pr-2 elegant-scrollbar" : ""}`}>
                    {categories.map((categorie) => (
                        <li key={categorie.id} className="flex items-center justify-between">
                            <p>{ categorie.name }</p>

                            <AlertModal
                                title="Eliminar Categoría" 
                                message={`Deseas eliminar la categoría ${categorie.name} de la plataforma`} 
                                action={deleteCategorie.bind(null, categorie.id)} 
                            >
                                <Button type="button" variant="outline" size="icon">
                                    <Trash2 size={24}/>
                                </Button>
                            </AlertModal>
                        </li>
                    ))}
                </ul>
            </CardContent>
            
            <CardFooter>
                <CreateCategorieForm/>
            </CardFooter>
        </Card>
    )
}
