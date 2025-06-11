import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth.config";
import { LoadingImage } from "@/components/global/LodingImage";
import { ArrowLeft } from "lucide-react";
import { fontText } from "@/config/fonts";
import { getProductsInfo } from "@/actions/products/get-product-info";
import { CartCounter } from "@/components/shop/product/cart-counter";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
    params: Promise<{ id: string, categorie: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { id, categorie } = await params;
    
    const session = await auth();

    const formatCategorie = decodeURIComponent(categorie);
    
    if (!id) notFound();

    const { result, data } = await getProductsInfo(Number(id));

    if (!result || !data) notFound();

    return (
        <>
            <section className="flex justify-between px-6 md:flex-col lg:px-0">
                <h1 className="text-lg md:text-xl font-medium lg:text-2xl">
                    Detalles del producto
                </h1>

                <Link href={`/${formatCategorie}`} className="border p-1 px-1.5 rounded-md active:bg-gray-200 md:hidden">
                    <ArrowLeft size={16}/>
                </Link>

                <div className="hidden md:block">
                    <Breadcrumbs
                        breadcrumbs={[
                            { label: "Inicio", destiny: "/" },
                            { label: `Categoría de ${formatCategorie}`, destiny: `/${formatCategorie}` }
                        ]}
                        final={data.name.substring(0, 32).concat("...")}
                    />
                </div>
            </section>

            <section className="flex flex-col px-6 mt-8 gap-8 mx-auto xl:flex-row lg:px-0">
                {/* Imagen del producto */}
                <Card className="p-6 items-center shadow-md">
                    <h3 className="text-lg md:text-xl text-center font-medium">
                        Imagen Ampliada
                    </h3>

                    <picture className="w-fit">
                        <LoadingImage
                            src={data.imageUrl ?? "/images/no_data.jpg"}
                            alt={`Imagen del prodcuto ${data.name}`}
                            width={480} height={320}
                            className="object-cover rounded-md"
                        />
                    </picture>
                </Card>

                {/* Detalles del producto */}
                <Card className="h-fit gap-0 w-full">
                    <CardHeader className="mb-0">
                        <CardTitle className="antialiased font-bold md:text-xl">
                            { data.name }
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="mt-0">
                        <div className="flex items-center gap-2">
                           {data.discount ? (
                                <>
                                    <span className="text-sm font-semibold md:text-base">
                                        ${data.finalPrice.toFixed(2)}
                                    </span>
                                    <span className="text-xs text-muted-foreground line-through md:text-sm">
                                        ${data.price}
                                    </span>
                                </>
                            ) : (
                                <span className="text-sm font-semibold md:text-base">
                                    ${data.price.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div className="mb-4">
                            <span className="text-xs md:text-sm">
                                Disponibles: { data.stock } unidades
                            </span>
                        </div>

                        {/* Description */}
                        <h3 className="font-bold text-sm">Descripción</h3>
                        
                        <p className={`${ fontText.className } antialiased text-xs font-light md:text-sm `}>
                            { data.description }
                        </p>
                    </CardContent>
                        
                    {session?.isAuthenticated && (
                        <CardFooter className="mt-6">
                            <CartCounter id={data.id} stock={data.stock} className="p-0 w-full"/>
                        </CardFooter>
                    )}
                </Card>
            </section>
        </>
    )
}
