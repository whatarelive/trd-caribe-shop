import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { ButtonDeleteItem } from "@/components/admin/buttons";
import type { FC } from "react";
import type { IProducts } from "@/interfaces/models/product.interface";

type ProductProps = Pick<IProducts, "id" | "name" | "categorie" | "description" | "price" | "stock">;

export const ProductCard: FC<{ product: ProductProps }> = ({ product }) => {
    return (
         <li className="flex flex-col gap-2 p-2 bg-white rounded-md">
            <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium line-clamp-2 max-w-3/5">
                    {product.name}
                </h3>

                <span className="max-w-2/5 font-medium text-orange-400 text-sm w-fit line-clamp-1">
                    { product.categorie }
                </span>
            </div>
            
            <hr className="text-gray-300"/>

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
                <Link href={`/admin/products/${product.id}`} className="button-primary-v3 grow">
                    <MdOutlineEdit size={24}/>
                    Editar
                </Link>

                <ButtonDeleteItem className="flex grow items-center justify-center gap-1.5 border bg-white">
                    Eliminar
                </ButtonDeleteItem>
            </div>
        </li>
    )
}
