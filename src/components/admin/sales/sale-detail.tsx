import clsx from "clsx";
import { MdPerson } from "react-icons/md";
import { saleForId } from "@/lib/data/sales";
import { SaleMethodPayment, SaleStatus } from "@/utils/enums";
import { ProductCard } from "@/components/admin/sales/product-card";
import "@/styles/scrollbar-style.css";

export const SaleDetail = () => {
    return (
        <section className="flex flex-col gap-6 lg:flex-row-reverse">
            {/* Sección de detalles */}
            <div className="flex flex-col gap-4 p-4 h-fit bg-gray-50 rounded-md lg:w-2/6">
                <div className="inline-flex gap-2">
                    <MdPerson size={24}/>
                    
                    <h3 className="font-medium text-xl">
                        { saleForId.user }
                    </h3>
                </div>

                <hr className="text-gray-300"/>

                <div className="flex justify-between">
                    <div>
                        <h4 className="font-medium">
                            Método de pago
                        </h4>

                        <span>
                            { SaleMethodPayment[saleForId.payment_method] }
                        </span>
                    </div>
                    
                    <div>
                        <h4 className="hidden min-[375px]:block font-medium">
                            Estado de Venta
                        </h4>

                        <span className={clsx(
                            "p-1 flex justify-center text-sm rounded-md border", 
                            { 
                                "bg-blue-100 text-blue-500 border-blue-500": saleForId.status === "PAID",
                                "bg-neutral-100 text-neutral-500 border-neutral-500": saleForId.status === "PENDING",
                                "bg-yellow-100 text-yellow-500 border-y-amber-500": saleForId.status === "SHIPPED",
                                "bg-green-100 text-green-500 border-green-500" : saleForId.status === "DELIVERED", 
                                "bg-red-100 text-red-500 border-e-red-500" : saleForId.status === "CANCELED" 
                            }
                        )}>
                            { SaleStatus[saleForId.status] }
                        </span>                        
                    </div>
                </div>
            </div>

            {/* Sección de listado de productos */}
            <div className="flex flex-col p-4 gap-4 bg-gray-50 rounded-md max-h-[calc(100vh-210px)] lg:w-4/6">
                <h3 className="text-xl font-medium">    
                    Listado de productos
                </h3>
            
                <ul className="flex flex-col gap-2 overflow-y-scroll elegant-scrollbar">
                    {saleForId.products.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            product={product}
                        />
                    ))}
                </ul>
            </div>
        </section>
    )
}
