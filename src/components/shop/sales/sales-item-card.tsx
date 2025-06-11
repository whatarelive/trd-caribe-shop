import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SaleItemClient } from "@/interfaces/models/sales.interface";


export function SaleItemCard({ item }: { item: SaleItemClient }) {
    const discount = (item.product.price - item.product.finalPrice) * item.quantity;

    return (
        <li className="space-y-2 pb-3 border-b">
            <div className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                    <h3 className="font-medium text-gray-900 leading-tight">
                        {item.product.name}
                    </h3>

                    <span className="text-sm text-gray-600 mt-1">
                        Cantidad: {item.quantity}
                    </span>
                </div>

                <span className="text-right font-semibold">
                    ${item.chargedPrice}
                </span>
            </div>

            {discount !== 0 && (
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                        <span className="line-through text-gray-400">
                            ${item.product.price.toFixed(2)}
                        </span>
                        
                        <Badge variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            
                            <span className="hidden min-[390px]:block">
                                Descuento
                            </span>
                        </Badge>
                    </div>

                    <span className="text-green-600 font-medium">
                        -$ {discount.toFixed(2)}
                    </span>
                </div>
            )}
        </li>
    )
}
