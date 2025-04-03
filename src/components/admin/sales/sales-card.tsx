import Link from "next/link";
import { MdInfoOutline } from "react-icons/md";
import { UserNameView } from "@/components/admin/users/users-utils";
import { SaleMethod, SaleStatus } from "@/components/admin/sales/sales-utils";

import type { FC } from "react";
import type { ISales } from "@/interfaces/models/sales.interface";

export const SalesCard: FC<{ sale: ISales }> = ({ sale }) => {
    return (
        <li className="p-4 bg-white rounded-md space-y-4">
            <div className="flex justify-between items-center">
                <UserNameView value={sale.user}/>
                <SaleStatus status={sale.status}/>
            </div>

            <hr className="text-gray-200"/>

            <div className="flex justify-between items-center">
                <span className="font-medium">
                    $ { sale.total }
                </span>

                <SaleMethod method={sale.payment_method}/>
            </div>

            <Link href={`/admin/sales/${sale.id}`} className="button-primary-v2 w-full">
                <MdInfoOutline size={20}/>
                Detalles
            </Link>
        </li>
    )
}
