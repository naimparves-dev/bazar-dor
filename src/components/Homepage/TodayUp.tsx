import ProductCard from "../Shared/ProductCard";
import type { Product } from "../Shared/Marquee";

interface TodayUpProps {
    UpProducts: Product[];
}

const TodayUp = ({ UpProducts }: TodayUpProps) => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <h2 className="mb-5 text-2xl font-bold">আজকে দাম বেড়েছে</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {UpProducts.slice(0, 6).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default TodayUp;