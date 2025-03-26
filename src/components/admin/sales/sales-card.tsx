import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";
import { MdPerson, MdInfoOutline, MdOutlineAddCard } from "react-icons/md";
import { SaleMethodPayment, SaleStatus } from "@/utils/enums";
import type { ISales } from "@/interfaces/models/sales.interface";

interface Props {
    sale: ISales;
}

export const SalesCard: FC<Props> = ({ sale }) => {
    return (
        <li className="p-4 bg-white rounded-md space-y-4">
            <div className="flex justify-between items-center">
                <div className="inline-flex gap-2 items-center">
                    <MdPerson size={20}/>

                    <h3 className="font-medium">
                        { sale.user }
                    </h3>
                </div>

                <span className={clsx(
                    "p-1 text-sm rounded-md border", 
                    { 
                        "bg-blue-100 text-blue-500 border-blue-500": sale.status === "PAID",
                        "bg-neutral-100 text-neutral-500 border-neutral-500": sale.status === "PENDING",
                        "bg-yellow-100 text-yellow-500 border-y-amber-500": sale.status === "SHIPPED",
                        "bg-green-100 text-green-500 border-green-500" : sale.status === "DELIVERED", 
                        "bg-red-100 text-red-500 border-e-red-500" : sale.status === "CANCELED" 
                    }
                )}>
                    { SaleStatus[sale.status] }
                </span>
            </div>

            <hr className="text-gray-200"/>

            <div className="flex justify-between items-center">
                <span className="font-medium">
                    $ { sale.total }
                </span>

                <div className="inline-flex gap-2 items-center">
                    <MdOutlineAddCard size={20}/>

                    <p className="text-">
                        { SaleMethodPayment[sale.payment_method] }
                    </p>
                </div>
            </div>

            <Link 
                href={`/admin/sales/${sale.id}`} 
                className="flex justify-center items-center gap-2 font-medium p-2 rounded-md text-white bg-blue-500 hover:bg-blue-400"
            >
                <MdInfoOutline size={20}/>
                Detalles
            </Link>
        </li>
    )
}
