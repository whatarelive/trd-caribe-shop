import Link from "next/link";
import { MdInfoOutline } from "react-icons/md";
// import { UserNameView } from "@/components/admin/users/users-utils";
import { SaleStatus } from "@/components/admin/sales/sales-utils";

import type { FC } from "react";
import type { SalesFromAPI } from "@/interfaces/models/sales.interface";

export const SalesCard: FC<{ sale: SalesFromAPI }> = ({ sale }) => {
    return (
        <li className="p-4 bg-white rounded-md space-y-4">
            <div className="flex justify-between items-center">
                {/* <UserNameView value={sale.user}/> */}
                <SaleStatus status={sale.status}/>
            </div>

            <hr className="text-gray-200"/>

            <div className="flex justify-between items-center">
                <span className="font-medium">
                    $ { sale.total }
                </span>

                {/* <SaleMethod method={sale.payment_method}/> */}
            </div>

            <Link href={`/admin/sales/${sale.id}`} className="button-primary-v3 lg:button-primary-v2">
                <MdInfoOutline size={20}/>
                Detalles
            </Link>
        </li>
    )
}
