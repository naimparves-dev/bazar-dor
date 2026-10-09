import ProductCard from "../Shared/ProductCard";
import type { Product } from "../Shared/Marquee";

interface AllProductsProps {
    products: Product[];
}

const AllProducts = ({ products }: AllProductsProps) => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <h2 className="mb-5 text-2xl font-bold">সকল পণ্য</h2>
            <p className="mb-3.5 font-semibold text-gray-500">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.slice(0, 33).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default AllProducts;