import { Suspense } from "react";
// import { TitlePage } from "@/components/admin/title-page";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SaleDetail } from "@/components/admin/sales/sale-detail";

export default function SalesInfoPage() {
    return (
        <section className="flex flex-col w-full gap-6 p-4 min-[375px]:p-8 xl:pr-16">
            {/* Sección del formulario con fondo blanco y bordes redondeados */}
            <div>
                {/* <TitlePage title="Detalles de la Venta"/> */}

                <Breadcrumbs 
                    breadcrumbs={[
                        { label: "Inicio", destiny: "/admin" },
                        { label: "Ventas", destiny: "/admin/sales" },
                    ]} 
                    final="Detalles"
                />
            </div>

            {/* Información de la venta */}
            <Suspense fallback={<span>Cargando....</span>}>
                <SaleDetail/>
            </Suspense>
        </section>
    )
}
