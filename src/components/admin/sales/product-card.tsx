import type { FC } from "react";
import type { IProducts } from "@/interfaces/models/product.interface";

interface Props {
    product: {
        quantity: number;
        charged_price: string;
    } & Pick<IProducts, "id" | "name" | "price" | "discount">;
}

const PriceSection: FC<{ label: string, value: number | string}> = ({ label, value }) => {
    return (
        <div className="inline-flex gap-2">
            <h4>{ label }</h4>
            <b>$ { value }</b>
        </div>
    )
}  

export const ProductCard: FC<Props> = ({ product }) => {
    return (
        <li className="flex flex-col gap-2 p-4 rounded-md bg-white">
            <h4 className="font-medium text-lg">
                {`${product.quantity}x ${product.name}`}
            </h4>

            <hr className="text-gray-300"/>

            <div className="flex flex-col gap-2 justify-between lg:flex-row lg:gap-0">
                <PriceSection label="Precio x Unidad:" value={product.price}/>
                <PriceSection label="Descuento x Unidad:" value={product.discount}/>
                <PriceSection label="Precio Total:" value={product.charged_price}/>
            </div>
        </li>
    )
}
