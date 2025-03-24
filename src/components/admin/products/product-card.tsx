import Link from "next/link";
import type { FC } from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import type { IProducts } from "@/interfaces/models/product.interface";

interface Props {
    product: Pick<IProducts, "id" | "name" | "categorie" | "description" | "price" | "stock">;
}

export const ProductCard: FC<Props> = ({ product }) => {
    return (
         <li className="flex flex-col gap-2 p-2 border border-gray-300 rounded-md">
            <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium line-clamp-2 max-w-3/5">
                    {product.name}
                </h3>

                <span className="max-w-2/5 font-medium text-orange-400 text-sm w-fit line-clamp-1">
                    { product.categorie }
                </span>
            </div>
            
            <div className="bg-gray-300 h-px rounded-full"/>

            <div className="flex justify-start gap-4">
                <span className="text-sm font-medium">
                    { product.stock } unidades
                </span>

                <span className="text-sm font-medium">
                    { product.price } x unidad
                </span>
            </div>

            <p className="text-wrap text-sm line-clamp-3 w-fit text-neutral-500">
                {product.description}
            </p>

            <div className="flex gap-2">
                <Link 
                    href={`/admin/products/${product.id}`} 
                    className="flex w-full items-center justify-center gap-2 h-11 p-2 rounded-md 
                    text-base font-semibold bg-blue-500 text-white cursor-pointer"
                >
                    <MdOutlineEdit size={24}/>
                    Editar
                </Link>

                <button 
                    className="flex w-full items-center justify-center gap-2 h-11 p-2 rounded-md 
                    text-base font-semibold border-2 border-gray-300 text-gray-400 hover:border-red-500 
                    hover:text-red-500 cursor-pointer"
                >
                    <MdDeleteOutline size={24}/>
                    Eliminar
                </button>
            </div>
        </li>
    )
}
