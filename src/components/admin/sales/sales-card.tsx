import Link from "next/link";
import { Eye, Package } from "lucide-react";
import { SaleMethod } from "@/components/global/SaleMethod";
import { SaleStatus } from "@/components/global/SaleStatus";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { SaleClient } from "@/interfaces/models/sales.interface";


export function SalesCard({ sale }: { sale: SaleClient }) {
    return (
        <Card className="w-full shadow-md">
            <CardHeader className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-md bg-neutral-200">
                        <Package size={16} />
                    </div>

                    <span className="font-semibold text-gray-900">
                        Orden #{sale.id}
                    </span>
                </div>

                <SaleStatus status={sale.status}/>
            </CardHeader>

            <CardContent>
                <div className="flex justify-between md:flex-col">
                    <div className="flex flex-col justify-between text-sm mb-2 md:flex-row">
                        <span className="text-gray-600">
                            Usuario:
                        </span>
                        <span className="font-medium">
                            {sale.user}
                        </span>
                    </div>

                    <div className="flex flex-col justify-between text-sm mb-2 md:flex-row">
                        <span className="text-gray-600">
                            Método de pago:
                        </span>

                        <SaleMethod method={sale.method}/>
                    </div>
                </div>

                <hr />

                <div className="flex justify-between items-center mt-6">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-xl font-bold text-gray-900">${sale.total}</span>
                </div>
            </CardContent>

            <CardFooter>
                <Link 
                    href={`/admin/sales/${sale.id}`} 
                    className="group flex h-9 grow justify-center items-center border rounded-md hover:bg-blue-400"
                >
                    <Eye className="w-4 h-4 mr-2 group-hover:text-white" />
                    <span className="text-sm font-medium group-hover:text-white">
                        Ver detalles
                    </span>
                </Link>
            </CardFooter>
        </Card>
    )
}
