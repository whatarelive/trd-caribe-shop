import { getProducts } from "@/src/lib/actions/products";

export default async function ProductsPage() {
    const products = await getProducts();

    console.log(products);

    return (
        <div>
            <h1>Productos</h1>
        </div>
    );
}
