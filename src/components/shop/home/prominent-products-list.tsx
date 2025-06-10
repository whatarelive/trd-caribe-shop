import { auth } from "@/auth.config";
import { getProducts } from "@/actions/products/get-products";
import { ErrorSection } from "@/components/global/ErrorSection";
import { ProductCard } from "@/components/shop/product/products-card";


export async function ProductProminentList() {
    const [session, products] = await Promise.all([
        auth(),
        getProducts({ page: 1, limit: 12 }),
    ]);

    if (!products.data || !products.result || products.error) {
        return <ErrorSection variant="data"/>
    }

    return (
        <ul className="flex flex-wrap gap-6 justify-center w-fit mb-8">
            {products.data.map((product, index) => (
                <li key={index}>
                    <ProductCard product={product} isAuth={session?.isAuthenticated ?? false}/>
                </li>
            ))}
        </ul>
    )
}
