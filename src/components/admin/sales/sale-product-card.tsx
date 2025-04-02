import { DataSection } from "@/components/admin/sales/sales-utils";

import type { FC } from "react";
import type { IProducts } from "@/interfaces/models/product.interface";

interface Props {
    product: {
        quantity: number;
        charged_price: string;
    } & Pick<IProducts, "id" | "name" | "price" | "discount">;
}

export const SaleProductCard: FC<Props> = ({ product }) => {
    return (
        <li className="flex flex-col gap-2 p-4 rounded-md bg-white">
            <h4 className="font-medium text-lg">
                {`${product.quantity}x ${product.name}`}
            </h4>

            <hr className="text-gray-300"/>

            <div className="flex flex-col gap-2 justify-between lg:flex-row lg:gap-0">
                <DataSection 
                    label="Precio x Unidad:" 
                    value={product.price} 
                    className="lg:justify-start lg:inline-flex"
                />

                <DataSection 
                    label="Descuento x Unidad:" 
                    value={product.discount} 
                    className="lg:justify-start lg:inline-flex"
                />
                
                <DataSection 
                    label="Precio Total:" 
                    value={product.charged_price} 
                    className="lg:justify-start lg:inline-flex"
                />
            </div>
        </li>
    )
}
