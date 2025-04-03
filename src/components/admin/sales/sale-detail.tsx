import { UserNameView } from "@/components/admin/users/users-utils";
import { SaleProductCard } from "@/components/admin/sales/sale-product-card";
import { SaleMethod, SaleStatus } from "@/components/admin/sales/sales-utils";
import { saleForId } from "@/lib/data/sales";

import "@/styles/scrollbar-style.css";

export const SaleDetail = () => {
    return (
        <section className="flex flex-col gap-6 lg:flex-row-reverse">
            {/* Sección de detalles */}
            <div className="flex flex-col gap-4 p-4 h-fit bg-gray-50 rounded-md lg:w-2/6">
                <UserNameView value={saleForId.user}/>

                <hr className="text-gray-300"/>

                <div className="flex flex-col-reverse justify-between gap-4 min-[375px]:flex-row">
                    <div>
                        <h4 className="font-medium">
                            Método de pago
                        </h4>

                        <SaleMethod method={saleForId.payment_method}/>
                    </div>
                    
                    <div>
                        <h4 className="hidden min-[375px]:block font-medium">
                            Estado de Venta
                        </h4>

                        <SaleStatus 
                            status={saleForId.status} 
                            className="flex justify-center"
                        />                    
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
                        <SaleProductCard 
                            key={product.id} 
                            product={product}
                        />
                    ))}
                </ul>
            </div>
        </section>
    )
}
