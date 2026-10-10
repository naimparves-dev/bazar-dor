import ProductCard from "../Shared/ProductCard";
import type { Product } from "../Shared/Marquee";

interface TodayDownProps {
    downProducts: Product[];
}

const TodayDown = ({ downProducts }: TodayDownProps) => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
            <h2 className="mb-4 sm:mb-5 text-xl sm:text-2xl font-bold text-gray-900">আজকে দাম কমেছে</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {downProducts.slice(0, 6).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default TodayDown;