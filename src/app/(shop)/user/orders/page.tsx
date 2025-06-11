import Link from "next/link";
import { Suspense } from "react";
import { SalesUserList } from "@/components/shop/sales/sales-list";
import OrdersUserListSkeleton from "@/components/shop/sales/skeletons";
import type { IPage } from "@/interfaces/components";


export default async function UserOrdersPage({ searchParams }: IPage) {
    const { page = "1" } = await searchParams;

    return (
        <>
            <section className="container mx-auto px-6 my-12 text-center md:px-0">
                <h2 className="text-xl font-medium lg:text-3xl">
                    Compras Realizadas
                </h2>

                <p className="mt-2 mb-4 text-muted-foreground text-sm lg:text-base">
                    Revisa tus productos comprados, pedidos en proceso y entregas finalizadas
                </p>

                {/* Enlace para regresar a la página principal */}
                <Link href="/" className="h-9 p-2 text-sm text-white font-medium bg-blue-500 rounded-md hover:bg-blue-600">
                    Seguir comprando
                </Link>
            </section>

            <Suspense key={page} fallback={<OrdersUserListSkeleton/>}>
                <SalesUserList page={Number(page)}/>
            </Suspense>
        </>
    )
}
